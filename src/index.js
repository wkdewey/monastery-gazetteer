const BACKEND_URL = "http://localhost:3000";
function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => renderMonasteries(json));
}

function renderMonasteries(json) {
  console.log(json);
}
document.addEventListener("DOMContentLoaded", function () {
  fetchMonasteries();
});
