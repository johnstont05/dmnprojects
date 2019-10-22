// -----------------------------------------------------------------------------
// FORMATS LARGE NUMBERS TO USE COMMAS

// A helper function to add commas every three digits in numbers larger than 1,000
// -----------------------------------------------------------------------------

export default function (number) {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
