import $ from 'jquery';
import numWithCommas from './num-with-commas';

export default function (school, district) {

  function checkNumber(n) {
    if (n === '.') {
      return 'N/A';
    } return n;
  }

  function checkPct(n) {
    if (n === '.') {
      return 0;
    } return n;
  }

  function checkBarText(n) {
    if (n === '.') {
      return '';
    } return n;
  }
  const dashCats = ['overall__col', 'academic__col', 'performance__col', 'achievement__col', 'gaps__col'];
  const schoolCats = ['CDALLS', 'CD2AS', 'CD2BS', 'CD1S', 'CD3S'];
  const districtCats = ['DDALLS', 'DD2AS', 'DD2BS', 'DD1S', 'DD3S'];

  $('#school-name').text(school.properties.CAMPNAME);
  $('#school-address').text(school.properties.ADDRESS);
  $('#school-district').text(school.properties.DISTNAME);
  $('#school-students').text(numWithCommas(school.properties.CPETALLC));
  $('#school-grades').text(school.properties.GRDSPAN);

  $('#overall__col h5').text(checkNumber(school.properties.CDALLS));
  $('#academic__col h5').text(checkNumber(school.properties.CD2AS));
  $('#performance__col h5').text(checkNumber(school.properties.CD2BS));
  $('#achievement__col h5').text(checkNumber(school.properties.CD1S));
  $('#gaps__col h5').text(checkNumber(school.properties.CD3S));

  if (school.properties.col_cred_per) {
    $('#grad-info').removeClass('no-show');

    $('#col-cred').text(`${school.properties.col_cred_per}%`);
    $('#assoc-deg').text(`${school.properties.assoc_deg_per}%`);
    $('#ind-cert').text(`${school.properties.ind_cert_per}%`);
    $('#mil-enl').text(`${school.properties.milt_enl_per}%`);
  } else {
    $('#grad-info').addClass('no-show');
  }

  for (let i = 0; i < 5; i += 1) {
    $(`#${dashCats[i]} ul li`).eq(0).find('span')
      .css('width', `${checkPct(school.properties[schoolCats[i]])}%`)
      .text(checkBarText(school.properties[schoolCats[i]]));

    if (checkPct(school.properties[schoolCats[i]]) === 0) {
      $(`#${dashCats[i]} ul li`).eq(0).find('span').addClass('no-pad');
    } else {
      $(`#${dashCats[i]} ul li`).eq(0).find('span').removeClass('no-pad');
    }
    
    $(`#${dashCats[i]} ul li`).eq(1).find('span')
      .css('width', `${district[districtCats[i]]}%`)
      .text(district[districtCats[i]]);
  }

}
