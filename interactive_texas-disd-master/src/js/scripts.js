import $ from 'jquery';
import csv from 'jquery-csv';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import selectize from 'selectize';

import './furniture';

import createPopup from './map-popup';
import dtFormatter from './datatable-data-formatter';
import findSchool from './find-school';
import updateDashboard from './update-dashboard';
import updateInfo from './map-info';

require('datatables.net')();
require('datatables.net-responsive-dt')();


// INITIALIZE THE MAP
// mapboxgl.accessToken = 'pk.eyJ1IjoidGF5bG9yLWpvaG5zdG9uIiwiYSI6ImNqd2pjOHZ5YzAzemM0M21waWFxdzVvOTEifQ.seYSW0fW4yEjTdfnRj-PJg';
$(document).ready(() => {

  const $select = $('#school-selectize');
  let selectize;
  const map = new mapboxgl.Map({
    container: 'map', // where to put it in DOM
    style: 'https://maps.dallasnews.com/styles.json', // link to custom styles
    zoom: 9,
    center: [-96.7645962, 32.7784163]
  });

  map.scrollZoom.disable();

  // ADDS NAVIGATION CONTROL
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');

  const schools = fetch('https://interactives.dallasnews.com/2019/texas-school-grades/data/cleaned/schools.geojson').then(response => response.json());
  const districts = fetch('https://interactives.dallasnews.com/2019/texas-school-grades/data/cleaned/districts.json').then(response => response.json())

  Promise.all([schools, districts]).then((values) => {
    // plucking out a random disd school and disd district info to send to the dashboard on load
    const disdSchools = values[0].features.filter(school => school.properties.DISTNAME === 'DALLAS ISD');
    const randomIndex = Math.floor(Math.random() * disdSchools.length);
    const starterSchool = disdSchools[randomIndex];
    const disd = values[1].find(district => district.DISTNAME === 'DALLAS ISD');
    updateDashboard(starterSchool, disd);

    // set up selectize

    const schoolObjs = [];
    values[0].features.forEach((school) => {
      schoolObjs.push(school.properties);
    });

    console.log(values[0].features.length, values[1].length);
    // creating our selectize dropdown with the defined options object
    $select.selectize({
      options: schoolObjs,
      maxItems: 1,
      valueField: 'searchable_name',
      searchField: 'searchable_name',
      placeholder: 'School name or city',
      sortField: 'searchable_name',
      labelField: 'searchable_name',
    });

    selectize = $select[0].selectize;

    findSchool(values[0], values[1], map);
    map.on('load', function () {
      map.addSource('campus', {
        type: 'geojson',
        data: values[0]
      });

const DataTable = require('datatables.net-zf')();

      const dataTable = $('#table_id').DataTable({
        destroy: true,
        responsive: true,
        paging: true,
        lengthMenu: [[5, 10, 25, -1], [5, 10, 25, 'All']],
        scrollX: true,
        pageLength: 10,
        data: dtFormatter(values[0], 'DALLAS ISD'),
        columns: [
          { title: 'Campus' },
          { title: 'Overall Perfomance' },
          { title: 'Academic Growth' },
          { title: 'Relative Perfomance' },
          { title: 'Student Achievement' },
          { title: 'Closing the Gaps' },
          { title: 'Enrollment' }
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

      createPopup(starterSchool, map);
      updateInfo(starterSchool, disd, map);

      map.on('click', 'disdPoints', function (e) {
        const school = e.features[0];
        const thisDistrict = values[1].find(district => district.DISTNAME === school.properties.DISTNAME);
        createPopup(school, map);
        updateInfo(school, thisDistrict, map);
        updateDashboard(school, thisDistrict);

        const newTableData = dtFormatter(values[0], thisDistrict.DISTNAME);

        dataTable.clear();
        $('#table_id').DataTable().clear().draw();
        $('#table_id').DataTable().rows.add(newTableData).draw();

        selectize.setValue(school.properties.searchable_name);
      });

      map.on('mousemove', (e) => {
        // find all features at the point of the event
        const features = map.queryRenderedFeatures(e.point, {});
        // if the first feature in the list of features has the specified property, display a pointer
        map.getCanvas().style.cursor = (features.length && features[0].properties.searchable_name !== undefined) ? 'crosshair' : '';
      })
    });
  });
});
