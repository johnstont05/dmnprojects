import $ from 'jquery';
import pym from 'pym.js';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';

const pymChild = new pym.Child();

$(document).ready(function() {
  console.log('DOM Ready');
// INITIALIZE THE MAP
  mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhhbmllbGFtbSIsImEiOiJjajN4aHdhcW8wMDlxMzFvaGVvYXh2bmdpIn0.ls4qPA-sZsOdw5kbAe8Ljg';
  const map = new mapboxgl.Map({
    container: 'map', // where to put it in DOM
    style: 'https://maps.dallasnews.com/styles.json', // link to custom styles
    maxZoom: 14,
    minZoom: 8,
    center: [-96.7645962, 32.7784163],
    zoom: 9.5,
  });

  // ADD THE MAP ZOOM TOOL
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    autocomplete: 'true',
    proximity: [-96.7645962, 32.7784163],

  }));

  function getData() {
    d3.json('data/oncor_outages.geojson').then((zipdata) => {
      // console.log(zipdata);

      map.addSource('zipdata', {
        type: 'geojson',
        data: zipdata,
      });

      // CREATE A FILL LAYER
      map.addLayer({
        id: 'zipcodes', // Name of layer
        type: 'fill',
        source: 'zipdata', // That source above
        paint: {
           'fill-color': {
             property: 'customers_affected_num',
             stops: [
                [0, '#ffffff'],
                [10, '#ffffcc'],
                [49, '#ffeda0'],
                [50, '#ffeda0'],
                [99, '#fed976'],
                [100, '#fed976'],
                [499, '#feb24c'],
                [500, '#feb24c'],
                [999, '#fd8d3c'],
                [1000, '#fd8d3c'],
                [4999, '#fc4e2a'],
                [5000, '#fc4e2a'],
                [9999, '#e31a1c'],
                [10000, '#e31a1c'],
                [19999, '#b10026'],
                [20000, '#b10026'],
             ]
           },
           'fill-opacity': .4,
           'fill-outline-color': '#184366',
         },
      });


      // When a click event occurs on a feature in the zipcodes layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on('click', 'zipcodes', function (e) {
        new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.customers_affected + ' of ' + e.features[0].properties.customers_served + ' customers in ' + e.features[0].properties.zip_code + ' are without power.')
      .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', 'zipcodes', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'zipcodes', function () {
        map.getCanvas().style.cursor = '';
      });

      pymChild.sendHeight();
    });
  }
  map.on('load', function () {
    getData();
  });
});
