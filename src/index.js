const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/figures`;

class Monastery {
  constructor(name, location, religious_tradition, figures) {
    this.name = name;
    this.location = location;
    this.religious_tradition = religious_tradition;
    if (figures) {
      this.figures = [];
      for (const figure of figures) {
        const figureName = figure["name"];
        this.figures.push(figureName);
      }
    }
    Monastery.allInstances.push(this);
  }
  render() {
    const contentContainer = document.querySelector("#content-container");
    const div = document.createElement("div");
    div.classList.add("monastery-card");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = this.name;
    link.addEventListener("click", this.showAssociatedFigures.bind(this));
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Location: " + this.location;
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent = "Religious tradition: " + this.religious_tradition;
    div.appendChild(tradition);
  }
  showAssociatedFigures() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    this.render();
    let figures = document.createElement("h3");
    figures.textContent = "Associated Figures";
    contentContainer.appendChild(figures);
    for (const figure of this.figures) {
      const figureObject = Figure.find(figure);
      figureObject.render();
    }
  }

  static find(name) {
    const found = Monastery.allInstances.find(
      (monastery) => monastery.name === name
    );
    return found;
  }
}
Monastery.allInstances = [];
class Figure {
  constructor(name, lifespan, religious_tradition, monasteries) {
    this.name = name;
    this.lifespan = lifespan;
    this.religious_tradition = religious_tradition;
    this.monasteries = [];
    if (monasteries) {
      for (const monastery of monasteries) {
        const monasteryName = monastery["name"];
        this.monasteries.push(monasteryName);
      }
    }
    Figure.allInstances.push(this);
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("figure-card");
    const contentContainer = document.querySelector("#content-container");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = this.name;
    link.addEventListener("click", this.showAssociatedMonasteries.bind(this));
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Lifespan: " + this.lifespan;
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent = "Religious tradition: " + this.religious_tradition;
    div.appendChild(tradition);
  }
  showAssociatedMonasteries() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    this.render();
    let monasteries = document.createElement("h3");
    monasteries.textContent = "Associated Monasteries";
    contentContainer.appendChild(monasteries);
    for (const monastery of this.monasteries) {
      const monasteryObject = Monastery.find(monastery);
      monasteryObject.render();
    }
  }
  static find(name) {
    const found = Figure.allInstances.find((figure) => figure.name === name);
    return found;
  }
}
Figure.allInstances = [];
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

function renderMonasteries(data) {
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  for (const key in data) {
    monastery = new Monastery(
      data[key]["attributes"]["name"],
      data[key]["attributes"]["location"],
      data[key]["attributes"]["religious_tradition"],
      data[key]["attributes"]["figures"]
    );
    monastery.render();
  }
}
function renderMonastery(data) {
  monastery = new Monastery(
    data["attributes"]["name"],
    data["attributes"]["location"],
    data["attributes"]["religious_tradition"]
  );

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
}

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
      data[key]["attributes"]["name"],
      data[key]["attributes"]["lifespan"],
      data[key]["attributes"]["religious_tradition"],
      data[key]["attributes"]["monasteries"]
    );
    figure.render();
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
  form.appendChild(h3);
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
async function showFigureForm() {
  const h2 = document.createElement("h2");
  h2.textContent = "New Buddhist Figure";
  const form = document.createElement("form");
  const br = document.createElement("br");
  const contentContainer = document.querySelector("#content-container");
  contentContainer.textContent = "";
  contentContainer.appendChild(h2);
  contentContainer.appendChild(form);
  form.id = "create-figure-form";
  const inputName = document.createElement("input");
  inputName.id = "input-name";
  inputName.type = "text";
  inputName.name = "name";
  inputName.value = "";
  inputName.placeholder = "Enter figure name";
  form.appendChild(inputName);
  form.appendChild(br);
  const inputLifespan = document.createElement("input");
  inputLifespan.id = "input-lifespan";
  inputLifespan.type = "text";
  inputLifespan.name = "lifespan";
  inputLifespan.value = "";
  inputLifespan.placeholder = "Enter lifespan";
  form.appendChild(inputLifespan);
  form.appendChild(br.cloneNode());
  const inputTradition = document.createElement("input");
  inputTradition.id = "input-religious-tradition";
  inputTradition.type = "text";
  inputTradition.name = "religious-tradition";
  inputTradition.value = "";
  inputTradition.placeholder = "Enter religious tradition";
  form.appendChild(inputTradition);
  form.appendChild(br.cloneNode());
  const h3 = document.createElement("h3");
  h3.textContent = "Choose Associated Monasteries";
  form.appendChild(h3);
  const monasteries = await getAllMonasteries();
  for (const monastery of monasteries) {
    const option = document.createElement("input");
    option.type = "checkbox";
    option.id = "input-monastery-" + monastery.id;
    option.name = "monastery";
    option.value = monastery.id;
    const label = document.createElement("label");
    label.for = option.id;
    label.textContent = monastery.attributes.name;
    form.appendChild(option);
    form.appendChild(label);
    form.appendChild(br.cloneNode());
  }
  const submit = document.createElement("input");
  submit.id = "create-button";
  submit.type = "submit";
  submit.name = "submit";
  submit.value = "Create New Figure";
  form.appendChild(submit);
  form.addEventListener("submit", (e) => createFigureFormHandler(e));
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
      console.log(figure);
      renderFigure(figure.data);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  let monasteryButton = document.querySelector("#monasteries_index");
  monasteryButton.addEventListener("click", fetchMonasteries);
  let figureButton = document.querySelector("#figures_index");
  figureButton.addEventListener("click", fetchFigures);
  let monasteryCreateButton = document.querySelector("#monasteries_create");
  monasteryCreateButton.addEventListener("click", showMonasteryForm);
  let figureCreateButton = document.querySelector("#figures_create");
  figureCreateButton.addEventListener("click", showFigureForm);
});
