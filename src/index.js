const BACKEND_URL = "http://localhost:3000";
function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonasteries(data));
}
function fetchMonastery(id) {
  return fetch(`${BACKEND_URL}/api/v1/monasteries/${id}`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonastery(data));
}

function renderMonasteries(data) {
  console.log(data);
}
function renderMonastery(json) {
  console.log(json);
}
document.addEventListener("DOMContentLoaded", function () {
  button = document.querySelector("#monasteries_index");
  button.addEventListener("click", fetchMonasteries);
});
