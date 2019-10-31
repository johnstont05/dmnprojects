import $ from 'jquery';
import styleGrade from './style-grade';

export default function (school, district, map) {
  console.log(school, district);

  // INFOBOX STUFF
  $('.schoolName').text(school.properties['CAMPNAME']); // school name
  $('.districtName').text(school.properties['DISTNAME']); // district name
  $('.econSchool').text(school.properties['CPETECOP']); // economic disadvantage % of school
  $('.econDistrict').text(district['DPETECOP']); // average economic disadvantage % of district
  // the list of grading categories each school and district are graded on
  // each array is set up as such:
  // ['<<category>>', '<<schoolGradeKey>>', '<<districtGradeKey>>']
  var gradeCategories = [
    ['overall', 'C_RATING', 'D_RATING'],
    ['growth', 'CD2AG', 'DD2AG'],
    ['performance', 'CD2BG', 'DD2BG'],
    ['achievement', 'CD1G', 'DD1G'],
    ['gap', 'CD3G', 'DD3G']
  ];
  console.log(district);
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
    const schoolGrade = school.properties[category[1]];
    const districtGrade = district[category[2]];
    // styles the appropriate letter
    styleGrade('School', category[0], schoolGrade);
    styleGrade('District', category[0], districtGrade);
  });
}
