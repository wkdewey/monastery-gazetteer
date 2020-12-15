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

  static fetchFigures() {
    return super
      .fetchEntries(FIGURES_URL)
      .then((data) => Figure.initialize(data));
  }

  static initialize(data) {
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

  static find(name) {
    const found = Figure.allInstances.find((figure) => figure.name === name);
    return found;
  }

  static showFigures() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    contentContainer.classList.add("row");
    for (const figure of Figure.allInstances) {
      figure.render(contentContainer);
    }
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
    contentContainer.classList.remove("row");
    this.render(contentContainer);
    let monasteries = document.createElement("h3");
    monasteries.textContent = "Associated Monasteries";
    contentContainer.appendChild(monasteries);
    for (const monastery of this.monasteries) {
      const monasteryObject = Monastery.find(monastery);
      monasteryObject.render(contentContainer);
    }
  }

  static showFigureForm() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.classList.remove("row");
    const form = document.createElement("form");
    const monasteries = Monastery.allInstances;
    super.showForm("figure", form, monasteries, contentContainer);
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
    const monasteryIds = super.getIds(checkboxes);
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
    console.log(JSON.stringify(bodyData));
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
}
