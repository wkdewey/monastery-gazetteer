class Figure {
  constructor(id, name, lifespan, religious_tradition, monasteries) {
    this.id = id;
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

  static createFromJson(data) {
    const figure = new Figure(
      data.id,
      data.attributes.name,
      data.attributes.lifespan,
      data.attributes.religious_tradition,
      data.attributes.figures
    );
    return figure;
  }
  static showFigureForm() {
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
    const monasteries = Monastery.allInstances;
    for (const monastery of monasteries) {
      const option = document.createElement("input");
      option.type = "checkbox";
      option.id = "input-monastery-" + monastery.id;
      option.name = "monastery";
      option.value = monastery.id;
      const label = document.createElement("label");
      label.for = option.id;
      label.textContent = monastery.name;
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
  static initialize(data) {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    for (const key in data) {
      new Figure(
        data[key]["id"],
        data[key]["attributes"]["name"],
        data[key]["attributes"]["lifespan"],
        data[key]["attributes"]["religious_tradition"],
        data[key]["attributes"]["monasteries"]
      );
    }
  }
  static showFigures() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    for (const figure of Figure.allInstances) {
      figure.render();
    }
  }
}
