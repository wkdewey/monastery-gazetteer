class Figure extends BuddhistEntity {
  constructor(id, name, lifespan, religious_tradition, monasteries) {
    super(id, name, religious_tradition);
    this.lifespan = lifespan;
    if (monasteries) {
      this.monasteries = [];
      for (const monastery of monasteries) {
        const monasteryName = monastery["name"];
        this.monasteries.push(monasteryName);
      }
    }
    Figure.allInstances.push(this);
  }

  render(contentContainer) {
    const div = document.createElement("div");
    const link = document.createElement("a");
    super.render(contentContainer, div, link);
    link.addEventListener("click", () => {
      this.showAssociatedMonasteries(contentContainer);
    });
    const lifespan = div.querySelector("p");
    lifespan.textContent = "Lifespan: " + this.lifespan;
  }
  showAssociatedMonasteries(contentContainer) {
    contentContainer.textContent = "";
    this.render(contentContainer);
    let monasteries = document.createElement("h3");
    monasteries.textContent = "Associated Monasteries";
    contentContainer.appendChild(monasteries);
    for (const monastery of this.monasteries) {
      const monasteryObject = Monastery.find(monastery);
      monasteryObject.render(contentContainer);
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
      data.attributes.monasteries
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
      figure.render(contentContainer);
    }
  }
  static showFigureForm() {
    const contentContainer = document.querySelector("#content-container");
    const form = document.createElement("form");
    super.showForm("figure", form, contentContainer);
    const monasteries = Monastery.allInstances;
    super.createCheckboxes(monasteries, "monastery", form);
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
    const monasteryIds = getIds(checkboxes);
    Figure.postFigures(
      nameInput,
      lifespanInput,
      religiousTraditionInput,
      monasteryIds
    );
  }
  static fetchFigures() {
    return fetch(`${BACKEND_URL}/api/v1/figures`)
      .then((response) => response.json())
      .then((json) => json["data"])
      .then((data) => Figure.initialize(data));
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
        const contentContainer = document.querySelector("#content-container");
        contentContainer.textContent = "";
        figureObject.render(contentContainer);
      });
  }
}
