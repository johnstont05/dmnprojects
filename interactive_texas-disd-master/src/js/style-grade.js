import $ from 'jquery';

export default function (level, category, grade) {

  const selectorId = `#${category}${level}`;
  if (grade === 'A') {
    $(`${selectorId} .letter.a`).addClass('active');
  } else if (grade === 'B') {
    $(`${selectorId} .letter.b`).addClass('active');
  } else if (grade === 'C') {
    $(`${selectorId} .letter.c`).addClass('active');
  } else if (grade === 'D') {
    $(`${selectorId} .letter.d`).addClass('active');
  } else if (grade === 'F') {
    $(`${selectorId} .letter.f`).addClass('active');
  }
}
