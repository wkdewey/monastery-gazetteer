class Monastery extends BuddhistEntity {
  constructor(id, name, location, religious_tradition, figures) {
    super(id, name, religious_tradition);
    this.location = location;
    if (figures) {
      this.figures = [];
      for (const figure of figures) {
        const figureName = figure["name"];
        this.figures.push(figureName);
      }
    }
    Monastery.allInstances.push(this);
  }
  render(contentContainer) {
    const div = document.createElement("div");
    const link = document.createElement("a");
    super.render(contentContainer, div, link);
    link.addEventListener("click", () => {
      this.showAssociatedFigures(contentContainer);
    });
    const lifespan = div.querySelector("p");
    lifespan.textContent = "Location: " + this.location;
  }
  showAssociatedFigures(contentContainer) {
    contentContainer.textContent = "";
    this.render(contentContainer);
    let figures = document.createElement("h3");
    figures.textContent = "Associated Figures";
    contentContainer.appendChild(figures);
    for (const figure of this.figures) {
      const figureObject = Figure.find(figure);
      figureObject.render(contentContainer);
    }
  }

  static find(name) {
    const found = Monastery.allInstances.find(
      (monastery) => monastery.name === name
    );
    return found;
  }

  static createFromJson(data) {
    const monastery = new Monastery(
      data.id,
      data.attributes.name,
      data.attributes.location,
      data.attributes.religious_tradition,
      data.attributes.figures
    );
    return monastery;
  }
  static initialize(data) {
    for (const key in data) {
      new Monastery(
        data[key]["id"],
        data[key]["attributes"]["name"],
        data[key]["attributes"]["location"],
        data[key]["attributes"]["religious_tradition"],
        data[key]["attributes"]["figures"]
      );
    }
  }
  static showMonasteries() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    for (const monastery of Monastery.allInstances) {
      monastery.render(contentContainer);
    }
  }
  static showMonasteryForm() {
    super.showForm("monastery");
    const form = document.querySelector("form");
    const figures = Figure.allInstances;
    for (const figure of figures) {
      const option = super.createInputElement(
        "input-figure-" + figure.id,
        "checkbox",
        "figure",
        figure.id
      );
      super.createCheckboxOption(option, figure, form);
    }
    form.addEventListener("submit", (e) =>
      Monastery.createMonasteryFormHandler(e)
    );
  }

  static createMonasteryFormHandler(e) {
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
    Monastery.postMonasteries(
      nameInput,
      locationInput,
      religiousTraditionInput,
      figureIds
    );
  }
  static fetchMonasteries() {
    return fetch(`${BACKEND_URL}/api/v1/monasteries`)
      .then((response) => response.json())
      .then((json) => json["data"])
      .then((data) => Monastery.initialize(data));
  }
  static postMonasteries(
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
        const monasteryObject = Monastery.createFromJson(monastery.data);
        monasteryObject.render();
      });
  }
}
