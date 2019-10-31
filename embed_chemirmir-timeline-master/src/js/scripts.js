/* global mapboxgl: true */

import $ from 'jquery';
import geoJSON from 'geojson';
import pym from 'pym.js';

import drawMap from './draw-map';
import mapInteractions from './map-interactions';
import findFeatureIndex from './find-feature';
import drawTimeline from './timeline';


const pymChild = new pym.Child();


// convets normal json data with a latitude and longitude properties into geojson
// if your data contains geographic data but the keys are named differently, change
// the strings in the 'Point' array below to match your lat long property names
// If your data is already geojson, you can omit this portion and change the data
// variable passed to the drawMap function below

// adjusts zoom level depending on window size. Depending on the area you're showing
// these numbers may need to be adjusted
const zoomLevel = $(window).width() <= 400 ? 6 : 7;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://maps.dallasnews.com/styles.json',
  center: [-96.7947381, 32.8665983],
  zoom: zoomLevel,
});

let dataLength;
let features = [];

map.scrollZoom.disable(); // disable scroll zoom
map.addControl(new mapboxgl.NavigationControl()); // add zoom/nav controls
map.on('load', () => {
  fetch("https://interactives.dallasnews.com/data-store/2019/2019-06-chemirmir.json")
    .then(response => response.json())
    .then(data => {
      const geoData = geoJSON.parse(data, {
        Point: ['lat', 'long']
      });
      console.log(geoData);
      dataLength = geoData.features.length;
      features = geoData.features;
      mapInteractions.updateInfo(geoData.features[0]); // updates map on load with first event on timeline
      mapInteractions.displayPopup(map, geoData.features[0]); // updates popup on load with first event on timeline
      drawMap(map, geoData);
      drawTimeline(geoData.features);
    });
});

$(".tl-btn").click(function(){
  let slideNumber = findFeatureIndex(features);
  console.log(dataLength);
  const direction = $(this).attr("id");
  console.log(direction);
  if (direction === "btn-next") {
    slideNumber += 1;
  } else {
    slideNumber -= 1;
  }
  if (slideNumber === 0) {
    $("#btn-prev").hide();
  } else if (slideNumber === dataLength - 1){
    $("#btn-next").hide();
  } else {
    $(".tl-btn").show();
  }
  mapInteractions.updateInfo(features[slideNumber]);
  mapInteractions.displayPopup(map, features[slideNumber]);

  $('#timeline-points .timeline-point').removeClass('active-point');
  $('#timeline-points .timeline-point').eq(slideNumber).addClass('active-point');
});

// go get the data
pymChild.sendHeight();
