import $ from 'jquery';

import formatDate from './date-format';

export default function (data) {

  function daysBetween(date1, date2) {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const date1MS = d1.getTime();
    const date2MS = d2.getTime();

    const differenceMS = Math.abs(date1MS - date2MS);

    return Math.round(differenceMS / ONE_DAY);
  }

  const totalDays = daysBetween(data[0].properties.date, data[data.length - 1].properties.date);

  let points = '';

  data.forEach((entry) => {
    const daysSince = daysBetween(data[0].properties.date, entry.properties.date);
    console.log(daysSince);

    const percentage = ((daysSince / totalDays) * 100).toFixed(1);


    if (percentage <= 50) {
      points += `<span class='left-point timeline-point' style='left: ${percentage}%'> ${formatDate(entry.properties.date)}</span>`;
    } else {
      points += `<span class='right-point timeline-point' style='left: ${percentage}%'> ${formatDate(entry.properties.date)}</span>`;
    }
  });

  $('#timeline-points').html(points);

  $('#timeline-points .timeline-point').eq(0).addClass('active-point');
}
