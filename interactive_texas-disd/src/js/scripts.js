import $ from 'jquery';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import dtFormatter from './datatable-data-formatter';
import './furniture';

var dt = require('datatables.net')();

// INITIALIZE THE MAP
mapboxgl.accessToken = 'pk.eyJ1IjoidGF5bG9yLWpvaG5zdG9uIiwiYSI6ImNqd2pjOHZ5YzAzemM0M21waWFxdzVvOTEifQ.seYSW0fW4yEjTdfnRj-PJg';
$(document).ready(() => {
  // ---------------------------------------------------------------------------
  // HELPER FUNCTIONS FOR FINDING OUR GRADES AND MARKING OUR LETTERS
  // ---------------------------------------------------------------------------

  function letterGrade (numGrade) {
    if ((numGrade <= 100) && (numGrade >= 90)) {
      return 'A';
    } else if ((numGrade >= 80) && (numGrade <= 89)) {
      return 'B';
    } else if ((numGrade >= 70) && (numGrade <= 79)) {
      return 'C';
    } else if ((numGrade >= 60) && (numGrade <= 69)) {
      return 'D';
    } else {
      return 'F';
    }
  }

  function styleGrade (level, category, grade) {
    console.log(level, category, grade);
    const selectorId = `#${category}${level}`;
    if (grade === 'A') {
      $(`${selectorId} .letter.a`).addClass('active');
    } else if (grade === 'B') {
      $(`${selectorId} .letter.b`).addClass('active');
    } else if (grade === 'C') {
      $(`${selectorId} .letter.c`).addClass('active');
    } else if (grade === 'D') {
      $(`${selectorId} .letter.d`).addClass('active');
    } else {
      $(`${selectorId} .letter.f`).addClass('active');
    }
  }

  // ---------------------------------------------------------------------------
  // END HELPER FUNCTIONS
  // ---------------------------------------------------------------------------

  const map = new mapboxgl.Map({
    container: 'map', // where to put it in DOM
    style: 'https://maps.dallasnews.com/styles.json', // link to custom styles
    zoom: 9,
    center: [-96.7645962, 32.7784163]
  });

  map.scrollZoom.disable();

  // ADDS GEOCODER
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,

    // limit results to Australia
    states: 'tx',

    // apply a client side filter to further limit results to those strictly within
    // the New South Wales region
    filter: function (item) {
      // returns true if item contains New South Wales region
      return item.context.map(function (i) {
        // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        // this example attempts to find the `region` named `New South Wales`
        return (i.id.split('.').shift() === 'region' && i.text === 'Texas');
      }).reduce(function (acc, cur) {
        return acc || cur;
      });
    },
    mapboxgl: mapboxgl
  }));

  // ADDS NAVIGATION CONTROL
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');

  // skips first instance
  var clickedStateId = null;

  // PUTS POINTS ON MAP
  map.on('load', function () {
    d3.json('data/data_0702.geojson').then((disdData) => {
      for (var i = 0; i < disdData.features.length; i++) {
        disdData.features[i].id = i + 1;
        disdData.features[i].properties['CDALLS'] = +disdData.features[i].properties['CDALLS'];
      }
      map.addSource('campus', {
        type: 'geojson',
        data: disdData
      });


      $('#table_id').DataTable({
        data: dtFormatter(disdData, 'DALLAS ISD'),
        columns: [
          { title: 'Campus' },
          { title: 'Enrollment' },
          { title: 'Economically <br> Disadvantaged' },
          { title: 'Overall Perfomance <br> Score' },
          { title: 'Academic Growth  <br> Score' },
          { title: 'Relative Perfomance <br> Score' },
          { title: 'Student Achievement <br> Score' },
          { title: 'Closing the Gaps <br> Score' }
        ]
      });

      // LAYER FOR SCHOOLS
      map.addLayer({
        id: 'disdPoints',
        type: 'circle',
        source: 'campus',
        paint: {
          'circle-color': [
            'case',
            ['==', ['to-string', ['get', 'CDALLS']], '.'], '#999',
            ['==', ['to-number', ['get', 'CDALLS']], 0], '#e34e36',
            ['<=', ['to-number', ['get', 'CDALLS']], 59], '#e34e36',
            ['<=', ['to-number', ['get', 'CDALLS']], 69], '#ff8f24',
            ['<=', ['to-number', ['get', 'CDALLS']], 79], '#fec44f',
            ['<=', ['to-number', ['get', 'CDALLS']], 89], '#52b033',
            ['<=', ['to-number', ['get', 'CDALLS']], 100], '#329ce8',
            '#999'
          ],
          'circle-radius': ['interpolate',
            ['linear'],
            ['zoom'],
            6, 1,
            8, 4
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': [
            'case',
            ['==', ['get', 'CFLCHART'], 'Y'], 2,
            0
          ],
          'circle-stroke-color': '#000',
          'circle-stroke-opacity': 0.5
        },
        layout: {
          visibility: 'visible'
        }
      },
      'place_other');
      // Create a popup, but don't add it to the map yet.
      map.on('click', 'disdPoints', function (e) {
        var popup = new mapboxgl.Popup();
        console.log(e);
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // goes to the first id of points
        if (clickedStateId) {
          map.setFeatureState({
            source: 'campus',
            id: clickedStateId
          }, {
            click: false
          });
        }
        clickedStateId = e.features[0].id;
        map.setFeatureState({
          source: 'campus',
          id: clickedStateId
        }, {
          click: true
        });
        var schoolName = e.features[0].properties.school_nam;
        map.setPaintProperty('disdPoints', 'circle-radius', [
          'case',
          ['==', ['to-string', ['get', 'school_nam']], schoolName], 15,
          5
        ]);
        // Adds content to the popup
        var coordinates = e.features[0].geometry.coordinates.slice();
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 10
        });
        var school = '<h6>' + '<p class="pop">' + '<strong>' + e.features[0].properties['school_nam'] + '</strong>' + '</h6>';
        school += e.features[0].properties['instructio'];
        school += '<p>Enrollment: ' + '<strong>' + e.features[0].properties['school_enr'] + '</strong></p>';
        school += '<p>Grades served: ' + '<strong>' + e.features[0].properties['GRDSPAN'] + '</strong></p>';
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
          .setHTML(school)
          .addTo(map);
        // INFOBOX STUFF
        $('.schoolName').text(e.features[0].properties['school_nam']); // school name
        $('.districtName').text(e.features[0].properties['DISTNAME']); // district name
        $('.econSchool').text(e.features[0].properties['CPETECOP']); // economic disadvantage % of school
        $('.econDistrict').text(Math.round(e.features[0].properties['AVG_CPETECOP'])); // average economic disadvantage % of district
        // the list of grading categories each school and district are graded on
        // each array is set up as such:
        // ['<<category>>', '<<schoolGradeKey>>', '<<districtGradeKey']
        var gradeCategories = [
          ['overall', 'CDALLS', 'AVG_CDALLS'],
          ['growth', 'CD2AS', 'AVG_CD2AS'],
          ['performance', 'CD2BS', 'AVG_CD2BS'],
          ['achievement', 'CD1S', 'AVG_CD1S'],
          ['gap', 'CD3S', 'AVG_CD3S']
        ];
        // clearing the active class from any letters previously set
        $('.letter').removeClass('active');
        // iterate over each category in the gradeCategories array defined above and
        // 1. Pull the number grade for both school and district
        // 2. Convert that number to a letter grade using the letterGrade function
        // 3. Passes the instiution level (School or District), the category name,
        // and the grade to the styleGrade function, which styles the correct grade
        gradeCategories.forEach(function (category) {
          // getting the raw number grade of the school and district for the
          // point clicked on for this category
          const schNum = e.features[0].properties[category[1]];
          const disNum = e.features[0].properties[category[2]];
          // converts number grades to letter grade
          const schoolGrade = letterGrade(schNum);
          const districtGrade = letterGrade(disNum);
          // styles the appropriate letter
          styleGrade('School', category[0], schoolGrade);
          styleGrade('District', category[0], districtGrade);
        });
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'disdPoints', function () {
          map.getCanvas().style.cursor = 'pointer';
        });
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'disdPoints', function () {
          map.getCanvas().style.cursor = '';
        });
      });
      // DATA TABLE
    });
  });
});
