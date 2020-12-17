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
    contentContainer.classList.remove("row");
    this.render(contentContainer);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete monastery";
    contentContainer.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) =>
      Monastery.deleteMonastery(e, this.id)
    );
    let editButton = document.createElement("button");
    editButton.textContent = "Edit monastery";
    contentContainer.appendChild(editButton);
    editButton.addEventListener("click", (e) =>
      Monastery.showEditForm(e, contentContainer, this)
    );
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
    const figures = Figure.allInstances;
    super.showForm("monastery", form, figures, contentContainer);
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

  static showEditForm(e, contentContainer, monastery) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    const form = document.createElement("form");
    contentContainer.appendChild(form);
    const figures = Figure.allInstances;
    Monastery.createInputs(form, monastery);
    BuddhistEntity.createCheckboxes(form, model, collection);
    BuddhistEntity.createSubmit(form, model);
  }

  static createInputs(form, monastery) {
    const fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);
    const h2 = document.createElement("h2");
    h2.textContent = `Edit monastery`;
    fieldset.appendChild(h2);
    fieldset.classList.add("d-flex", "flex-column", "align-items-left");
    const inputName = BuddhistEntity.createInputElement(
      "input-name",
      "text",
      "name",
      monastery.name,
      `Enter monastery name`
    );
    fieldset.appendChild(inputName);
    const br = document.createElement("br");
    fieldset.appendChild(br);
    const inputLocation = BuddhistEntity.createInputElement(
      `input-location`,
      "text",
      "location",
      monastery.location,
      `Enter location`
    );
    fieldset.appendChild(inputLocation);
    fieldset.appendChild(br.cloneNode());
    const inputTradition = BuddhistEntity.createInputElement(
      "input-religious-tradition",
      "text",
      "religious-tradition",
      monastery.religious_tradition,
      "Enter religious tradition"
    );
    fieldset.appendChild(inputTradition);
    fieldset.appendChild(br.cloneNode());
  }

  static createMonasteryEditHandler(e) {}

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
  static deleteMonastery(e, id) {
    const monasteryUrl = `${MONASTERIES_URL}/${id}`;
    fetch(monasteryUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
}
