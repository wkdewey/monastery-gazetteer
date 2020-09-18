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
  static fetchFigures() {
    return fetch(`${BACKEND_URL}/api/v1/figures`)
      .then((response) => response.json())
      .then((json) => json["data"])
      .then((data) => Figure.initialize(data));
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
    const inputName = document.createInputElement(
      "input-name",
      "text",
      "name",
      "",
      "Enter figure name"
    );
    form.appendChild(inputName);
    form.appendChild(br);
    const inputLifespan = document.createInputElement(
      "input-lifespan",
      "text",
      "lifespan",
      "",
      "Enter lifespan"
    );
    form.appendChild(inputLifespan);
    form.appendChild(br.cloneNode());
    const inputTradition = document.createInputElement(
      "input-religious-tradition",
      "text",
      "religious-tradition",
      "",
      "Enter religious tradition"
    );
    form.appendChild(inputTradition);
    form.appendChild(br.cloneNode());
    const h3 = document.createElement("h3");
    h3.textContent = "Choose Associated Monasteries";
    form.appendChild(h3);
    const monasteries = Monastery.allInstances;
    for (const monastery of monasteries) {
      const option = document.createInputElement(
        "checkbox",
        "input-monastery-" + monastery.id,
        "monastery",
        monastery.id
      );
      const label = document.createElement("label");
      label.for = option.id;
      label.textContent = monastery.name;
      form.appendChild(option);
      form.appendChild(label);
      form.appendChild(br.cloneNode());
    }
    const submit = document.createInputElement(
      "create-button",
      "submit",
      "submit",
      "Create New Figure"
    );
    form.appendChild(submit);
    form.addEventListener("submit", (e) => Figure.createFigureFormHandler(e));
  }

  static createFigureFormHandler(e) {
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
    Figure.postFigures(
      nameInput,
      lifespanInput,
      religiousTraditionInput,
      monasteryIds
    );
  }
  static postFigures(
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
        const figureObject = Figure.createFromJson(figure.data);
        figureObject.render();
      });
  }
}
