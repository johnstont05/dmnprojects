export default function (data, isd) {
  console.log(data.length);
  // filters data down to specified isd
  const filteredData = data.features.filter(function(d) {
    return d.properties.DISTNAME === isd;
  });

  console.log(filteredData);

  // creates new data in format we want
  const formattedData = filteredData.map((d) => {
    console.log('disd');
    return [
      d.properties.CAMPNAME,
      d.properties.school_enr,
      d.properties.CPETECOP,
      d.properties.CDALLS,
      d.properties.CD2AS,
      d.properties.CD2BS,
      d.properties.CD1S,
      d.properties.CD3S
    ];
  });

  console.log(formattedData);
  return formattedData;
}
