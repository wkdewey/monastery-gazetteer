const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/monasteries`;
class Monastery {
  constructor(name, location, religious_tradition, figures) {
    this.name = name;
    this.location = location;
    this.religious_tradition = religious_tradition;
    this.figures = [];
    if (figures) {
      for (const figure of figures) {
        const figureObject = new Figure(
          figure["name"],
          figure["lifespan"],
          figure["religious_tradition"]
        );
        this.figures.push(figureObject);
      }
    }
  }
}
class Figure {
  constructor(name, lifespan, religious_tradition, monasteries) {
    this.name = name;
    this.lifespan = lifespan;
    this.religious_tradition = religious_tradition;
    this.monasteries = [];
    if (monasteries) {
      for (const monastery of monasteries) {
        const monasteryObject = new Monastery(
          monastery["name"],
          monastery["location"],
          monastery["religious_tradition"]
        );
        this.monasteries.push(monasteryObject);
      }
    }
  }
}
function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonasteries(data));
}
function getAllMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => {
      return json["data"];
    });
}
//The below function may be redundant, consider refactoring after other parts of
function fetchMonastery(id) {
  return fetch(`${BACKEND_URL}/api/v1/monasteries/${id}`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => renderMonastery(data));
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
    data["attributes"]["religious_tradition"],
    data["attributes"]["figures"]
  );
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  let name = document.createElement("h2");
  name.textContent = monastery.name;
  contentContainer.appendChild(name);
  let location = document.createElement("p");
  location.textContent = "Location: " + monastery.location;
  contentContainer.appendChild(location);
  let tradition = document.createElement("p");
  tradition.textContent = "Tradition: " + monastery.religious_tradition;
  contentContainer.appendChild(tradition);
  let figures = document.createElement("h3");
  figures.textContent = "Associated Figures";
  contentContainer.appendChild(figures);
  for (const figure of monastery.figures) {
    let figureName = document.createElement("h4");
    figureName.textContent = figure.name;
    contentContainer.appendChild(figureName);
    let figureLocation = document.createElement("p");
    figureLocation.textContent = "Lifespan: " + figure.lifespan;
    contentContainer.appendChild(figureLocation);
    let figureTradition = document.createElement("p");
    figureTradition.textContent = "Tradition: " + figure.religious_tradition;
    contentContainer.appendChild(figureTradition);
  }
}

function renderFigure(data) {
  figure = new Figure(
    data["attributes"]["name"],
    data["attributes"]["lifespan"],
    data["attributes"]["religious_tradition"],
    data["attributes"]["monasteries"]
  );
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
  monasteries.textContent = "Associated Monasteries";
  contentContainer.appendChild(monasteries);
  for (const monastery of figure.monasteries) {
    let monasteryName = document.createElement("h4");
    monasteryName.textContent = monastery.name;
    contentContainer.appendChild(monasteryName);
    let monasteryLocation = document.createElement("p");
    monasteryLocation.textContent = "Location: " + monastery.location;
    contentContainer.appendChild(monasteryLocation);
    let monasteryTradition = document.createElement("p");
    monasteryTradition.textContent =
      "Tradition: " + monastery.religious_tradition;
    contentContainer.appendChild(monasteryTradition);
  }
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
  }
}

async function showMonasteryForm() {
  const h2 = document.createElement("h2");
  h2.textContent = "New Monastery";
  const form = document.createElement("form");
  const br = document.createElement("br");
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  contentContainer.appendChild(h2);
  contentContainer.appendChild(form);
  form.id = "create-monastery-form";
  const inputName = document.createElement("input");
  inputName.id = "input-name";
  inputName.type = "text";
  inputName.name = "name";
  inputName.value = "";
  inputName.placeholder = "Enter monastery name";
  form.appendChild(inputName);
  form.appendChild(br);
  const inputLocation = document.createElement("input");
  inputLocation.id = "input-location";
  inputLocation.type = "text";
  inputLocation.name = "location";
  inputLocation.value = "";
  inputLocation.placeholder = "Enter location";
  form.appendChild(inputLocation);
  form.appendChild(br.cloneNode());
  const inputTradition = document.createElement("input");
  inputTradition.id = "input-religious-tradition";
  inputTradition.type = "text";
  inputTradition.name = "religious-tradition";
  inputTradition.value = "";
  inputTradition.placeholder = "Enter religious tradition";
  form.appendChild(inputTradition);
  form.appendChild(br.cloneNode());
  //get all figures, iterate through them, put their name and id
  //means I need a function that just returns all the figures
  const h3 = document.createElement("h3");
  h3.textContent = "Choose Associated Figures";
  const figures = await getAllFigures();
  for (const figure of figures) {
    const option = document.createElement("input");
    option.type = "checkbox";
    option.id = "input-figure-" + figure.id;
    option.name = "figure";
    option.value = figure.id;
    const label = document.createElement("label");
    label.for = option.id;
    label.textContent = figure.attributes.name;
    form.appendChild(option);
    form.appendChild(label);
    form.appendChild(br.cloneNode());
  }
  const submit = document.createElement("input");
  submit.id = "create-button";
  submit.type = "submit";
  submit.name = "submit";
  submit.value = "Create New Monastery";
  form.appendChild(submit);
  form.addEventListener("submit", (e) => createMonasteryFormHandler(e));
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
      console.log(monastery);
      renderMonastery(monastery.data);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  let monasteryButton = document.querySelector("#monasteries_index");
  monasteryButton.addEventListener("click", fetchMonasteries);
  let figureButton = document.querySelector("#figures_index");
  figureButton.addEventListener("click", fetchFigures);
  let monasteryCreateButton = document.querySelector("#monasteries_create");
  monasteryCreateButton.addEventListener("click", showMonasteryForm);
});
