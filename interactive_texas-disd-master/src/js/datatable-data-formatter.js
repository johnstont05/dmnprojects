import numWithCommas from './num-with-commas';

export default function (data, isd) {

  function checkNumber(n) {
    if (n === '.') {
      return 'N/A';
    } return n;
  }

  // filters data down to specified isd
  const filteredData = data.features.filter(function (d) {
    return d.properties.DISTNAME === isd;
  });

  const tableLabelName = document.getElementById('table-label-name');
  tableLabelName.innerHTML = isd;

  // creates new data in format we want
  const formattedData = filteredData.map((d) => {
    return [
      d.properties.CAMPNAME,
      checkNumber(d.properties.CDALLS),
      checkNumber(d.properties.CD2AS),
      checkNumber(d.properties.CD2BS),
      checkNumber(d.properties.CD1S),
      checkNumber(d.properties.CD3S),
      numWithCommas(d.properties.CPETALLC)
    ];
  });

  return formattedData;
}
