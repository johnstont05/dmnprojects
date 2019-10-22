/* global mapboxgl: true */
import $ from 'jquery';
import mapInteractions from './map-interactions';

// -----------------------------------------------------------------------------
// THE MAP DRAWING FUNCTIONS

// This is a basic drawing function for mapbox that takes the map object and
// some geojson data, adds it as a source, and then adds a layer of circles
// based on that data. Additional styling or layers may be needed depending on
// the type of data you're trying to display
// -----------------------------------------------------------------------------

export default function(map, data) {
  // adds the data source
  map.addSource('census', {
    type: 'geojson',
    data: 'data/cleaned_tracts.geojson'
  });

  // POPULATION TRACTS LAYER
  map.addLayer({
    id: 'population',
    type: 'fill',
    source: 'census',
    layout: {
      visibility: 'visible',
    },
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'pop']],
        0, '#f7fbff',
        1000, '#deebf7',
        2000, '#c6dbef',
        3000, '#9ecae1',
        4000, '#6baed6',
        5000, '#4292c6',
        6000, '#2171b5',
      ],
      'fill-opacity': 0.5,
    },
  });

  // INCOME TRACTS LAYER
  map.addLayer({
    id: 'income',
    type: 'fill',
    source: 'census',
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'income']],
        0, '#edf8e9',
        20000, '#c7e9c0',
        40000, '#a1d99b',
        60000, '#74c476',
        80000, '#31a354',
        100000, '#006d2c',
      ],
      'fill-opacity': 0.5
    },
  });

  // POVERTY TRACTS LAYER
  map.addLayer({
    id: 'poverty',
    type: 'fill',
    source: 'census',
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'pov']],
        0, '#dadaeb',
        10, '#bcbddc',
        20, '#9e9ac8',
        30, '#807dba',
        40, '#6a51a3',
        50, '#4a1486'
      ],
      'fill-opacity': 0.5
    },
  });

  // RACE TRACTS LAYER
  map.addLayer({
    id: 'race',
    type: 'fill',
    source: 'census',
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['*',
          ['/',
            ['-', ['to-number', ['get', 'pop']],
              ['to-number', ['get', 'white']]
            ],
            ['to-number', ['get', 'pop']]
          ],
          100
        ],
        0, '#feedde',
        20, '#fdd0a2',
        40, '#fdae6b',
        60, '#fd8d3c',
        80, '#e6550d',
        100, '#a63603',
      ],
      'fill-opacity': 0.5
    },
  });

  map.addSource('locations', {
    type: 'geojson',
    data,
  });

  // POOLS LAYER
  map.addLayer({
    id: 'markers',
    source: 'locations',
    type: 'circle',
    paint: {
      'circle-radius': [
        'match',
        ['get', 'Type'],
        'Public', 8,
        'Private', 3,
        5
      ],
      'circle-opacity': 0.8,
      'circle-color': [
        'match',
        ['get', 'Type'],
        'Public', '#000',
        'Private', '#626262',
        /* other */
        '#ccc'
      ],
      'circle-stroke-color': '#fff',
      'circle-stroke-width': .5,
    },
  });



  // creates a new bounding box based on the lat longs of the features in the data
  // and applys it to the map. Adjust padding as needed
  const bounds = new mapboxgl.LngLatBounds();
  data.features.forEach(feature => bounds.extend(feature.geometry.coordinates));
  map.fitBounds(bounds, {
    padding: 30
  });

  // add click event to display popups when feature is clicked
  map.on('click', event => mapInteractions.displayPopup(map, event));

  // changes cursor to pointer when mousing over a feature
  map.on('mousemove', event => mapInteractions.updateMapCursor(map, event));

  // BUTTON TOGGLES HERE
  $('.btn-group li').click(function() {
    // remove the active class from the buttons
    $('.active-layer').removeClass('active-layer');
    $('.active-scale').removeClass('active-scale');

    // add the active class to the button clicked
    $(this).addClass('active-layer');

    // an array with the ids of our data layers
    var dataLayers = ['population', 'income', 'poverty', 'race'];
    // iterate over our layers, setting their visibility to none
    dataLayers.forEach(function(layer) {
      map.setLayoutProperty(layer, 'visibility', 'none');
    });

    // get the id of the layer we want to show by pulling the id off the button clicked
    var targetLayer = $(this).attr('id');

    // set the visibility of that layer to visible
    map.setLayoutProperty(targetLayer, 'visibility', 'visible');
    $(`#${targetLayer}Scale`).addClass('active-scale');
  });


}
