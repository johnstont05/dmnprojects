import formatNumber from './num-with-commas';

export default function (school, map) {
  // generate a new popup
  var popup = new mapboxgl.Popup();

  // create the popup text
  var popupText = '<h6>' + '<p class="pop">' + '<strong>' + school.properties['CAMPNAME'] + '</strong>' + '</h6>';
  popupText += '<p>Enrollment: ' + '<strong>' + formatNumber(school.properties['CPETALLC']) + '</strong></p>';
  popupText += '<p>Grades served: ' + '<strong>' + school.properties['GRDSPAN'] + '</strong></p>';

  // grab the coordinates of the target school
  var coordinates = school.geometry.coordinates.slice();

  // display the popup
  popup.setLngLat(coordinates)
    .setHTML(popupText)
    .addTo(map);

  const currentZoom = map.getZoom();
  console.log(currentZoom);

  const targetZoom = currentZoom > 10 ? currentZoom : 10;
  // recenter the map on the selected schools coordinates
  map.flyTo({
    center: school.geometry.coordinates,
    zoom: targetZoom,
  });

  // enlarge that school's circle
  map.setPaintProperty('disdPoints', 'circle-radius', [
    'case',
    ['==', ['to-string', ['get', 'searchable_name']], school.properties.searchable_name], 15,
    5
  ]);
}
