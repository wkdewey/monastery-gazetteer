// const BACKEND_URL = "https://young-forest-03120.herokuapp.com";
const BACKEND_URL = "http://localhost:3000";
const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
const FIGURES_URL = `${BACKEND_URL}/api/v1/figures`;

function addClickListener(element, callback) {
  const button = element;
  button.addEventListener("click", callback);
}

document.addEventListener("DOMContentLoaded", function () {
  Monastery.allInstances = [];
  Figure.allInstances = [];
  Monastery.fetchMonasteries();
  Figure.fetchFigures();
  addClickListener(
    document.querySelector("#monasteries_index"),
    Monastery.fetchAndRenderMonasteries
  );
  addClickListener(
    document.querySelector("#figures_index"),
    Figure.fetchAndRenderFigures
  );
  addClickListener(
    document.querySelector("#monasteries_create"),
    Monastery.renderForm
  );
  addClickListener(
    document.querySelector("#figures_create"),
    Figure.renderForm
  );
});
