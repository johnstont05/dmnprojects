import moment from 'moment';


export default function (date) {
// parse the dateObject into the desired format using moment.js
let plainDate = moment(date).format('MMM. D, YYYY');

// convert our plainDate into proper AP month abbreviations
if (plainDate.includes('Mar.')) {
  plainDate = plainDate.replace('Mar.', 'March');
} else if (plainDate.includes('Apr.')) {
  plainDate = plainDate.replace('Apr.', 'April');
} else if (plainDate.includes('May.')) {
  plainDate = plainDate.replace('May.', 'May');
} else if (plainDate.includes('Jun.')) {
  plainDate = plainDate.replace('Jun.', 'June');
} else if (plainDate.includes('Jul.')) {
  plainDate = plainDate.replace('Jul.', 'July');
} else if (plainDate.includes('Sep.')) {
  plainDate = plainDate.replace('Sep.', 'Sept.');
}

return plainDate;
}
