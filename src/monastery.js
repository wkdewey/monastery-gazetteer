class Monastery {
  constructor(id, name, location, religious_tradition, figures) {
    this.id = id;
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
    div.classList.add(
      "monastery-card",
      "album",
      "py-5",
      "bg-light",
      "container"
    );
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
      monastery.render();
    }
  }
  static showMonasteryForm() {
    const h2 = document.createElement("h2");
    h2.textContent = "New Monastery";
    const form = document.createElement("form");
    const br = document.createElement("br");
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    contentContainer.appendChild(h2);
    contentContainer.appendChild(form);
    form.id = "create-monastery-form";
    const inputName = Helpers.createInputElement(
      "input-name",
      "text",
      "name",
      "",
      "Enter monastery name"
    );
    form.appendChild(inputName);
    form.appendChild(br);
    const inputLocation = Helpers.createInputElement(
      "input-location",
      "text",
      "location",
      "",
      "Enter location"
    );
    form.appendChild(inputLocation);
    form.appendChild(br.cloneNode());
    const inputTradition = Helpers.createInputElement(
      "input-religious-tradition",
      "text",
      "religious-tradition",
      "",
      "Enter religious tradition"
    );
    form.appendChild(inputTradition);
    form.appendChild(br.cloneNode());
    //get all figures, iterate through them, put their name and id
    //means I need a function that just returns all the figures
    const h3 = document.createElement("h3");
    h3.textContent = "Choose Associated Figures";
    form.appendChild(h3);
    const figures = Figure.allInstances;
    for (const figure of figures) {
      const option = Helpers.createInputElement(
        "input-figure-" + figure.id,
        "checkbox",
        "figure",
        figure.id
      );
      const label = document.createElement("label");
      label.for = option.id;
      label.textContent = figure.name;
      form.appendChild(option);
      form.appendChild(label);
      form.appendChild(br.cloneNode());
    }
    const submit = Helpers.createInputElement(
      "create-button",
      "submit",
      "submit",
      "Create New Monastery"
    );
    form.appendChild(submit);
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
