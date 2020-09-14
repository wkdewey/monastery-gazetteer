const BACKEND_URL = "http://localhost:3000";
class Monastery {
  constructor(name, location, religious_tradition) {
    this.name = name;
    this.location = location;
    this.religious_tradition = religious_tradition;
  }
}
class Figure {
  constructor(name, lifespan, religious_tradition) {
    this.name = name;
    this.lifespan = lifespan;
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

function fetchFigures() {
  return fetch(`${BACKEND_URL}/api/v1/figures`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderFigures(data));
}
//The below function may be redundant, consider refactoring after other parts of
function fetchFigure(id) {
  return fetch(`${BACKEND_URL}/api/v1/figures/${id}`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderFigure(data));
}

function renderMonasteries(data) {
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
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

function renderFigure(data) {
  figure = new Figure(
    data["attributes"]["name"],
    data["attributes"]["lifespan"],
    data["attributes"]["religious_tradition"]
  );
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  const h2 = document.createElement("h2");
  h2.textContent = figure.name;
  contentContainer.appendChild(h2);
  const location = document.createElement("p");
  location.textContent = "Lifespan: " + figure.lifespan;
  contentContainer.appendChild(location);
  const tradition = document.createElement("p");
  tradition.textContent = "Tradition: " + figure.religious_tradition;
  contentContainer.appendChild(tradition);
}
function renderFigures(data) {
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  for (const key in data) {
    figure = new Figure(
      data[key]["attributes"]["name"],
      data[key]["attributes"]["lifespan"],
      data[key]["attributes"]["religious_tradition"]
    );
    const div = document.createElement("div");
    div.classList.add("monastery-card");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = figure.name;
    link.addEventListener("click", function () {
      fetchFigure(parseInt(key) + 1);
    });
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Lifespan: " + figure.lifespan;
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent =
      "Religious tradition: " + figure.religious_tradition;
    div.appendChild(tradition);
    debugger;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  monastery_button = document.querySelector("#monasteries_index");
  monastery_button.addEventListener("click", fetchMonasteries);
  figure_button = document.querySelector("#figures_index");
  figure_button.addEventListener("click", fetchFigures);
});
