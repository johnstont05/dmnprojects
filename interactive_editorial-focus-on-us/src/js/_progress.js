export default function (scrollPoint, windowHeight) {
  // get article height
  const articleHeight = document.getElementById('content').scrollHeight - windowHeight;

  // find progress_bar and it's styles
  const progressBar = document.getElementById('progress-bar');
  const barStyle = progressBar.style;

  // calculate percentage read by dividing the scroll position of the bottom of
  // the window by the articleHeight and converting to a percentage
  const perRead = ((scrollPoint / articleHeight).toFixed(2)) * 100;

  // set the progressBar's new width
  barStyle.width = `${perRead}%`;
}
