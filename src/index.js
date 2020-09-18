const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/figures`;

document.addEventListener("DOMContentLoaded", function () {
  Monastery.allInstances = [];
  Monastery.fetchMonasteries();
  Figure.allInstances = [];
  Figure.fetchFigures();
  let monasteryButton = document.querySelector("#monasteries_index");
  monasteryButton.addEventListener("click", Monastery.showMonasteries);
  let figureButton = document.querySelector("#figures_index");
  figureButton.addEventListener("click", Figure.showFigures);
  let monasteryCreateButton = document.querySelector("#monasteries_create");
  monasteryCreateButton.addEventListener("click", Monastery.showMonasteryForm);
  let figureCreateButton = document.querySelector("#figures_create");
  figureCreateButton.addEventListener("click", Figure.showFigureForm);
});
