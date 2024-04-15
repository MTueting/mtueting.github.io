// JavaScript function to toggle visibility of course list
function toggleList(listId) {
  var courseList = document.getElementById(listId);
  courseList.style.display = (courseList.style.display === 'none') ? 'block' : 'none';
}
