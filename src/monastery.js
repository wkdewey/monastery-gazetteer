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

  static fetchMonasteries() {
    return super
      .fetchEntries(MONASTERIES_URL)
      .then((data) => Monastery.initialize(data));
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
    contentContainer.classList.add("row");
    const alphabetizedMonasteries = Monastery.alphabetize(
      Monastery.allInstances
    );
    for (const monastery of alphabetizedMonasteries) {
      monastery.render(contentContainer);
    }
  }

  static alphabetize(collection) {
    let sorted = collection.sort(function (a, b) {
      const nameA = a.name;
      const nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    return sorted;
  }

  static find(name) {
    const found = Monastery.allInstances.find(
      (monastery) => monastery.name === name
    );
    return found;
  }

  render(contentContainer) {
    const div = document.createElement("div");
    const link = document.createElement("a");
    super.render(contentContainer, div, link);
    link.addEventListener("click", () => {
      this.showAssociatedFigures(contentContainer);
    });
    const location = div.querySelector("p");
    location.textContent = "Location: " + this.location;
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

  static showMonasteryForm() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.classList.remove("row");
    const form = document.createElement("form");
    super.showForm("monastery", form, contentContainer);
    const figures = Figure.allInstances;
    const fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);
    super.createCheckboxes(figures, "figure", fieldset);
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
    const figureIds = super.getIds(checkboxes);
    Monastery.postMonasteries(
      nameInput,
      locationInput,
      religiousTraditionInput,
      figureIds
    );
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
        const contentContainer = document.querySelector("#content-container");
        contentContainer.textContent = "";
        monasteryObject.render(contentContainer);
      });
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
}
