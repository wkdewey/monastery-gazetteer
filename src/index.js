const BACKEND_URL = "http://localhost:3000";
class Monastery {
  constructor(name, location, religious_tradition) {
    this.name = name;
    this.location = location;
    this.religious_tradition = religious_tradition;
  }
}
function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonasteries(data));
}
//The below function may be redundant, consider refactoring after other parts of
function fetchMonastery(id) {
  return fetch(`${BACKEND_URL}/api/v1/monasteries/${id}`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonastery(data));
}

function renderMonasteries(data) {
  const contentContainer = document.querySelector("#content-container");
  for (const key in data) {
    monastery = new Monastery(
      data[key]["attributes"]["name"],
      data[key]["attributes"]["location"],
      data[key]["attributes"]["religious_tradition"]
    );
    const div = document.createElement("div");
    div.classList.add("monastery-card");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = monastery.name;
    link.addEventListener("click", function () {
      fetchMonastery(parseInt(key) + 1);
    });
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Location: " + monastery.location;
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent =
      "Religious tradition: " + monastery.religious_tradition;
    div.appendChild(tradition);
  }
}
function renderMonastery(data) {
  monastery = new Monastery(
    data["attributes"]["name"],
    data["attributes"]["location"],
    data["attributes"]["religious_tradition"]
  );
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  const h2 = document.createElement("h2");
  h2.textContent = monastery.name;
  contentContainer.appendChild(h2);
  const location = document.createElement("p");
  location.textContent = "Location: " + monastery.location;
  contentContainer.appendChild(location);
  const tradition = document.createElement("p");
  tradition.textContent = "Tradition: " + monastery.religious_tradition;
  contentContainer.appendChild(tradition);
}
document.addEventListener("DOMContentLoaded", function () {
  button = document.querySelector("#monasteries_index");
  button.addEventListener("click", fetchMonasteries);
});
