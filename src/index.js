const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/figures`;

function fetchMonasteries() {
  return fetch(`${BACKEND_URL}/api/v1/monasteries`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => Monastery.initialize(data));
}

function fetchFigures() {
  return fetch(`${BACKEND_URL}/api/v1/figures`)
    .then((response) => response.json())
    .then((json) => json["data"])
    .then((data) => Figure.initialize(data));
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
      figureObject = Figure.createFromJson(figure.data);
      figureObject.render();
    });
}
document.addEventListener("DOMContentLoaded", function () {
  Monastery.allInstances = [];
  fetchMonasteries();
  Figure.allInstances = [];
  fetchFigures();
  let monasteryButton = document.querySelector("#monasteries_index");
  monasteryButton.addEventListener("click", Monastery.showMonasteries);
  let figureButton = document.querySelector("#figures_index");
  figureButton.addEventListener("click", Figure.showFigures);
  let monasteryCreateButton = document.querySelector("#monasteries_create");
  monasteryCreateButton.addEventListener("click", Monastery.showMonasteryForm);
  let figureCreateButton = document.querySelector("#figures_create");
  figureCreateButton.addEventListener("click", Figure.showFigureForm);
});
