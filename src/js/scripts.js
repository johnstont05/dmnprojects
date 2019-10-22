/* global mapboxgl: true */

import $ from 'jquery';
import pym from 'pym.js';
import geoJSON from 'geojson';
import drawMap from './draw-map';
import locations from '../data/data.json';

const pymChild = new pym.Child();

// convets normal json data with a latitude and longitude properties into geojson
// if your data contains geographic data but the keys are named differently, change
// the strings in the 'Point' array below to match your lat long property names
// If your data is already geojson, you can omit this portion and change the data
// variable passed to the drawMap function below
const geoData = geoJSON.parse(locations, { Point: ['Latitude', 'Longitude'] });

// adjusts zoom level depending on window size. Depending on the area you're showing
// these numbers may need to be adjusted
const zoomLevel = $(window).width() <= 400 ? 6 : 7;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://maps.dallasnews.com/styles.json',
  center: [-96.7947381, 32.8665983],
  zoom: zoomLevel,
});

map.scrollZoom.disable(); // disable scroll zoom
map.addControl(new mapboxgl.NavigationControl()); // add zoom/nav controls
map.on('load', () => drawMap(map, geoData)); // go get the data

pymChild.sendHeight();
