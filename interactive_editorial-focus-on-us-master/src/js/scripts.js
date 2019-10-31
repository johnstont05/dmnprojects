import $ from 'jquery';
import updateProgress from './_progress';

import './furniture';

$(document).ready(() => {

  const dataSource = 'https://interactives.dallasnews.com/data-store/2019/2019-05-editorial-focus-on-us.json';

  const aoes = ['civic engagement', 'sex trafficking', 'teaching in poverty'];

  // filters data by supplied aoe filter string, then sorts resulting arrays by pubdate
  function sortData(data, filter) {
    const sortedByArea = data.filter(record => record.area === filter);
    sortedByArea.sort((a, b) => {
      const aDate = new Date(a.pubdate.split('T')[0]);
      const bDate = new Date(b.pubdate.split('T')[0]);
      if (aDate > bDate) {
        return -1;
      } return 1;
    });

    return sortedByArea;
  }

  // passes off data to be filtered, then creates link list for each aoe
  function updateLinks(data) {
    // create placeholder array for sorted data
    const sortedData = [];
    // iterate through aoes and pass off data for filtering
    for (let i = 0; i < aoes.length; i += 1) {
      sortedData[i] = sortData(data, aoes[i]);
    }
    console.log(sortedData);

    // build link lists and inject into html

    sortedData.forEach((aoeArray) => {
      let counter = 0;
      aoeArray.forEach((aoeRecord) => {
        if (counter < 5) {
          const linkMarkup = `<li><a href='${aoeRecord.url}'>${aoeRecord.headline}</a></li>`;
          if (aoeRecord.area === 'civic engagement') {
            $('#focus__civic .links-list').append(linkMarkup);
          } else if (aoeRecord.area === 'sex trafficking') {
            $('#focus__st .links-list').append(linkMarkup);
          } else if (aoeRecord.area === 'teaching in poverty') {
            $('#focus__teaching .links-list').append(linkMarkup);
          }

          counter += 1;
        }
      });
    });
  }

  // clicking links in intro scrolls page to corresponding section
  $('.intro a').click(function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 300);
  });

  $(window).scroll(() => {
    updateProgress($(window).scrollTop(), $(window).height());
  });

  fetch(dataSource)
    .then(response => response.json())
    .then(data => updateLinks(data));
});
