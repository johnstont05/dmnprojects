/* global mapboxgl: true */
import $ from 'jquery';
import pym from 'pym.js';
import formatDate from './date-format';


// -----------------------------------------------------------------------------
// POPULATING POPUPS WITH CONTENT

// Takes in a feature that has been interacted with (usually a click), creates html
// based on properties of that feature, and returns that html to the displayPopup
// function that called it. HTML will vary depending on what you're trying to display
// and the key names of the data
// -----------------------------------------------------------------------------

// adds mugs to sidebar and shows location images on map
const pymChild = new pym.Child();

function createPopupContent(feature) {
  let content = '';
  content += `<h6>${feature.properties.location}</h6>`;
  if (feature.properties.img !== undefined && feature.properties.imgtype === "location") {
    content += `<img src="img/${feature.properties.img}.jpg">`;
  }
  return content;
}

// passes information into sidebar
function updateInfo(feature) {
  $('.case-label').text(feature.properties.category)
  if (feature.properties.category == "death") {
    $('.case-label').css("background", "#e34e36");
  } else if (feature.properties.category == "arrest") {
    $('.case-label').css("background", "#fec44f");
  } else if (feature.properties.category == "attempt") {
    $('.case-label').css("background", "#52b033");
  } else if (feature.properties.category == "investigation") {
    $('.case-label').css("background", "#8554bf");
  }
  $('#date').text(formatDate(feature.properties.date));
  $('#headline').text(feature.properties.title);
  $('#area').text(feature.properties.location);
  $('#description').text(feature.properties.copy);

  if (feature.properties.url !== undefined) {
    const link = `<a href=${feature.properties.url} target='_blank'>Read more.</a>`;
    $('#url').html(link);
    $('#url').show();
  } else {
    $('#url').hide();
  }

  if (feature.properties.imgtype === "mug") {
    $('#profile').removeClass("no-show");
    $('#profile').attr("src", `img/${feature.properties.img}.jpg`);
  } else {
    $('#profile').addClass("no-show");
  }
  pymChild.sendHeight();
  setTimeout(function() {
    pymChild.sendHeight();
  }, 500);
}


// -----------------------------------------------------------------------------
// DISPLAYING POPUPS

// When a feature is clicked on, this function creates the popup, places it accordingly
// and hands the feature off to create the html needed for the content of the popup.
// It then centers the map to that feature
// -----------------------------------------------------------------------------

function displayPopup(map, feature) {
  $(".mapboxgl-popup").remove();
  // construct a new mapbox popup, set it's long/lat position to the long/lat
  // of the feature and set it's html to the result of the createPopupContent function
  const popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(createPopupContent(feature));

  // add the popup to the map
  popup.addTo(map);

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
  map.getCanvas().style.cursor = (features.length && features[0].properties.copy !== undefined) ? 'pointer' : '';
}


export default {
  displayPopup,
  updateMapCursor,
  updateInfo
};
