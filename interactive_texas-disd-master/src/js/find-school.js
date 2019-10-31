import $ from 'jquery';

import createPopup from './map-popup';
import dtFormatter from './datatable-data-formatter';
import updateDashboard from './update-dashboard';
import updateInfo from './map-info';

var dt = require('datatables.net')();

export default function (schools, districts, map) {
  console.log(schools.features[0]);
  $('#school-selectize').on('change', () => {
    $('.mapboxgl-popup').remove();
    const selectedName = $('#school-selectize option:selected').text();
    if (selectedName.length > 0) {
      const selectedSchool = schools.features.find(school => school.properties.searchable_name === selectedName);
      let selectedDistrict;
      if (selectedSchool) {
        selectedDistrict = districts.find(district => district.DISTNAME === selectedSchool.properties.DISTNAME);
      }

      console.log(selectedSchool, selectedDistrict);

      updateDashboard(selectedSchool, selectedDistrict);

      const dataTable = $('#table_id').DataTable();

      const newData = dtFormatter(schools, selectedDistrict.DISTNAME);

      dataTable.clear();
      $('#table_id').DataTable().clear().draw();
      $('#table_id').DataTable().rows.add(newData).draw();

      createPopup(selectedSchool, map);
      updateInfo(selectedSchool, selectedDistrict, map);
    }
  });
}
