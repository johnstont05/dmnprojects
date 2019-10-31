/* global mapboxgl: true */

import formatNumbers from './numbers-with-commas';

// -----------------------------------------------------------------------------
// POPULATING POPUPS WITH CONTENT

// Takes in a feature that has been interacted with (usually a click), creates html
// based on properties of that feature, and returns that html to the displayPopup
// function that called it. HTML will vary depending on what you're trying to display
// and the key names of the data
// -----------------------------------------------------------------------------

function createPopupContent(feature) {
  let content = '';
  if (feature.properties.Type === 'Public') {
    content += `<h6>${feature.properties.Name}</h6>`;
    if (feature.properties.Upgraded === 'Y') {
      content += `<p>${feature.properties.upgraded_year}</p>`;
    }
    return content;
  }
}

// -----------------------------------------------------------------------------
// DISPLAYING POPUPS

// When a feature is clicked on, this function creates the popup, places it accordingly
// and hands the feature off to create the html needed for the content of the popup.
// It then centers the map to that feature
// -----------------------------------------------------------------------------

function displayPopup(map, event) {
  // collect all the features at the point of the event
  const features = map.queryRenderedFeatures(event.point, {});

  // if there are no features at that point, return out of the function
  if (!features.length) { return; }

  // else, set feature to the first feature in the list of features
  const feature = features[0];

  // construct a new mapbox popup, set it's long/lat position to the long/lat
  // of the feature and set it's html to the result of the createPopupContent function
  const popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(createPopupContent(feature));

  // add the popup to the map
  popup.addTo(map);

  // animate the map to the coordinates of the feature
  map.flyTo({
    center: feature.geometry.coordinates,
    zoom: 10,
  });
}

// -----------------------------------------------------------------------------
// DISPLAYING POINTER WHEN MOUSING OVER FEATURES

// Checks when the user mouses over the map, and if they mouse over a feature with
// a specified property, changes the hand to a pointer. Note, you may need to change
// what property is checked for based on your data
// -----------------------------------------------------------------------------

function updateMapCursor(map, event) {
  // find all features at the point of the event
  const features = map.queryRenderedFeatures(event.point, {});

  // if the first feature in the list of features has the specified property, display a pointer
  map.getCanvas().style.cursor = (features.length && features[0].properties['Type'] !== 'Private') ? 'pointer' : '';
}

export default { displayPopup, updateMapCursor };
