const BACKEND_URL = "http://localhost:3000";
function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => renderMonasteries(json));
}
function fetchMonastery(id) {
  return fetch(`${BACKEND_URL}/api/v1/monasteries/${id}`)
    .then((response) => response.json())
    .then((json) => renderMonastery(json));
}

function renderMonasteries(json) {
  console.log(json);
}
function renderMonastery(json) {
  console.log(json);
}
document.addEventListener("DOMContentLoaded", function () {
  fetchMonasteries();
  fetchMonastery(1);
});
