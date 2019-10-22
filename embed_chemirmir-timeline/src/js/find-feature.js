import $ from 'jquery';

export default function (features) {
  const currentHead = $('#headline').text();
  const i = features.findIndex(feature => feature.properties.title === currentHead);
  return i;
}
