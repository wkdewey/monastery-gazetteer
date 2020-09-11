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
  const contentContainer = document.querySelector("#content-container");
  for (const key in data) {
    const div = document.createElement("div");
    div.classList.add("monastery-card");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = data[key]["attributes"]["name"];
    link.addEventListener("click", function () {
      fetchMonastery(parseInt(key) + 1);
    });
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Location: " + data[key]["attributes"]["location"];
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent =
      "Tradition: " + data[key]["attributes"]["religious_tradition"];
    div.appendChild(tradition);
  }
}
function renderMonastery(data) {
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  const h2 = document.createElement("h2");
  h2.textContent = data["attributes"]["name"];
  contentContainer.appendChild(h2);
  const location = document.createElement("p");
  location.textContent = "Location: " + data["attributes"]["location"];
  contentContainer.appendChild(location);
  const tradition = document.createElement("p");
  tradition.textContent =
    "Tradition: " + data["attributes"]["religious_tradition"];
  contentContainer.appendChild(tradition);
}
document.addEventListener("DOMContentLoaded", function () {
  button = document.querySelector("#monasteries_index");
  button.addEventListener("click", fetchMonasteries);
});
