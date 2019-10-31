/* global mapboxgl: true */
import mapInteractions from './map-interactions';


// -----------------------------------------------------------------------------
// THE MAP DRAWING FUNCTIONS

// This is a basic drawing function for mapbox that takes the map object and
// some geojson data, adds it as a source, and then adds a layer of circles
// based on that data. Additional styling or layers may be needed depending on
// the type of data you're trying to display
// -----------------------------------------------------------------------------

export default function(map, geoData) {
  // adds the data source
  map.addSource('locations', {
    type: 'geojson',
    data: geoData,
  });

  // adds the marker layer
  map.addLayer({
    id: 'markers',
    source: 'locations',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#329ce8',
      'circle-opacity': 0.85,
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-width': 1
    }
  });

  // creates a new bounding box based on the lat longs of the features in the data
  // and applys it to the map. Adjust padding as needed
  const bounds = new mapboxgl.LngLatBounds();
  geoData.features.forEach(feature => bounds.extend(feature.geometry.coordinates));

  // add click event to display popups when feature is clicked
  map.on('click', event => {
    const features = map.queryRenderedFeatures(event.point, {});

    // if there are no features at that point, return out of the function
    if (!features.length) {
      return;
    }

    // else, set feature to the first feature in the list of features
    const feature = features[0];
    if (feature.properties.copy !== undefined) {
      mapInteractions.updateInfo(feature)
      mapInteractions.displayPopup(map, feature)
    } else {
      return;
    }

  });
}
