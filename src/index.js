const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/figures`;

function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => Monastery.initialize(data));
}
function getAllMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => {
      return json["data"];
    });
}
function getAllFigures() {
  return fetch(`${BACKEND_URL}/api/v1/figures`)
    .then((response) => response.json())
    .then((json) => {
      return json["data"];
    });
}

function fetchFigures() {
  return fetch(`${BACKEND_URL}/api/v1/figures`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => Figure.initialize(data));
}

function renderMonasteries(data) {}

function renderFigure(data) {
  figure = new Figure(
    data["attributes"]["name"],
    data["attributes"]["lifespan"],
    data["attributes"]["religious_tradition"],
    data["attributes"]["monasteries"]
  );
  figure.render();
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  let name = document.createElement("h2");
  name.textContent = figure.name;
  contentContainer.appendChild(name);
  let location = document.createElement("p");
  location.textContent = "Lifespan: " + figure.lifespan;
  contentContainer.appendChild(location);
  let tradition = document.createElement("p");
  tradition.textContent = "Tradition: " + figure.religious_tradition;
  contentContainer.appendChild(tradition);
  let monasteries = document.createElement("h3");
  // monasteries.textContent = "Associated Monasteries";
  // contentContainer.appendChild(monasteries);
  // for (const monastery of figure.monasteries) {
  //   let monasteryName = document.createElement("h4");
  //   monasteryName.textContent = monastery.name;
  //   contentContainer.appendChild(monasteryName);
  //   let monasteryLocation = document.createElement("p");
  //   monasteryLocation.textContent = "Location: " + monastery.location;
  //   contentContainer.appendChild(monasteryLocation);
  //   let monasteryTradition = document.createElement("p");
  //   monasteryTradition.textContent =
  //     "Tradition: " + monastery.religious_tradition;
  //   contentContainer.appendChild(monasteryTradition);
}
function renderFigures(data) {
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  for (const key in data) {
    figure = new Figure(
      data[key]["id"],
      data[key]["attributes"]["name"],
      data[key]["attributes"]["lifespan"],
      data[key]["attributes"]["religious_tradition"],
      data[key]["attributes"]["monasteries"]
    );
    figure.render();
  }
}

function createMonasteryFormHandler(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#input-name").value;
  const locationInput = document.querySelector("#input-location").value;
  const religiousTraditionInput = document.querySelector(
    "#input-religious-tradition"
  ).value;
  const checkboxes = document.getElementsByName("figure");
  const figureIds = Array.prototype.slice
    .call(checkboxes)
    .filter((ch) => ch.checked == true)
    .map((ch) => parseInt(ch.value));
  postMonasteries(nameInput, locationInput, religiousTraditionInput, figureIds);
}
function postMonasteries(
  nameInput,
  locationInput,
  religiousTraditionInput,
  figureIds
) {
  let bodyData = {
    name: nameInput,
    location: locationInput,
    religious_tradition: religiousTraditionInput,
    figure_ids: figureIds,
  };
  fetch(MONASTERIES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((monastery) => {
      monasteryObject = Monastery.createFromJson(monastery.data);
      monasteryObject.render();
    });
}

function createFigureFormHandler(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#input-name").value;
  const lifespanInput = document.querySelector("#input-lifespan").value;
  const religiousTraditionInput = document.querySelector(
    "#input-religious-tradition"
  ).value;
  const checkboxes = document.getElementsByName("monastery");
  const monasteryIds = Array.prototype.slice
    .call(checkboxes)
    .filter((ch) => ch.checked == true)
    .map((ch) => parseInt(ch.value));
  console.log(nameInput, lifespanInput, religiousTraditionInput, monasteryIds);
  postFigures(nameInput, lifespanInput, religiousTraditionInput, monasteryIds);
}
function postFigures(
  nameInput,
  lifespanInput,
  religiousTraditionInput,
  monasteryIds
) {
  let bodyData = {
    name: nameInput,
    lifespan: lifespanInput,
    religious_tradition: religiousTraditionInput,
    monastery_ids: monasteryIds,
  };
  fetch(FIGURES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((figure) => {
      figureObject = Figure.createFromJson(figure.data);
      figureObject.render();
    });
}
document.addEventListener("DOMContentLoaded", function () {
  fetchMonasteries();
  fetchFigures();
  let monasteryButton = document.querySelector("#monasteries_index");
  monasteryButton.addEventListener("click", Monastery.showMonasteries());
  let figureButton = document.querySelector("#figures_index");
  figureButton.addEventListener("click", Figure.showFigures());
  let monasteryCreateButton = document.querySelector("#monasteries_create");
  monasteryCreateButton.addEventListener("click", Monastery.showMonasteryForm);
  let figureCreateButton = document.querySelector("#figures_create");
  figureCreateButton.addEventListener("click", Figure.showFigureForm);
});
