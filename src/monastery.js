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
    const figures = Figure.allInstances();
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
}
Monastery.allInstances = [];
