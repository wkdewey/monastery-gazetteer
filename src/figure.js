class Figure extends BuddhistEntity {
  constructor(
    id,
    name,
    lifespan,
    religious_tradition,
    monasteries,
    biography,
    image_url
  ) {
    super(id, name, religious_tradition, image_url);
    this.lifespan = lifespan;
    this.biography = biography;
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

  static fetchAndRenderFigures() {
    Figure.allInstances = [];
    return super
      .fetchEntries(FIGURES_URL)
      .then((data) => Figure.initialize(data))
      .then(() => Figure.renderFigures());
  }

  static initialize(data) {
    for (const key in data) {
      new Figure(
        data[key]["id"],
        data[key]["attributes"]["name"],
        data[key]["attributes"]["lifespan"],
        data[key]["attributes"]["religious_tradition"],
        data[key]["attributes"]["monasteries"],
        data[key]["attributes"]["image_url"],
        data[key]["attributes"]["biography"]
      );
    }
  }

  static find(name) {
    const found = Figure.allInstances.find((figure) => figure.name === name);
    return found;
  }

  static renderFigures() {
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
      this.renderFigure(contentContainer);
    });
    const lifespan = div.querySelector("p");
    lifespan.textContent = "Lifespan: " + this.lifespan;
  }
  renderFigure(contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    this.render(contentContainer);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete figure";
    contentContainer.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) =>
      Figure.deleteFigure(e, this.id)
    );
    let editButton = document.createElement("button");
    editButton.textContent = "Edit figure";
    contentContainer.appendChild(editButton);
    debugger;
    editButton.addEventListener("click", (e) =>
      this.renderEditForm(e, contentContainer, this)
    );
    let monasteries = document.createElement("h3");
    monasteries.textContent = "Associated Monasteries";
    contentContainer.appendChild(monasteries);
    for (const monastery of this.monasteries) {
      const monasteryObject = Monastery.find(monastery);
      monasteryObject.render(contentContainer);
    }
  }

  static renderForm() {
    const contentContainer = document.querySelector("#content-container");
    const form = document.createElement("form");
    const monasteries = Monastery.allInstances;
    super.createForm("figure", form, contentContainer);
    const fieldset = document.querySelector("fieldset");
    const br = document.createElement("br");
    const inputBiography = BuddhistEntity.createInputElement(
      "input-biography",
      "text-area",
      "biography",
      this.biography,
      "Enter a short biography"
    );
    fieldset.appendChild(inputBiography);
    fieldset.appendChild(br.cloneNode());
    super.completeForm("figure", form, monasteries);
    form.addEventListener("submit", (e) => Figure.createFigureFormHandler(e));
  }

  static createFigureFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const lifespanInput = document.querySelector("#input-lifespan").value;
    const religiousTraditionInput = document.querySelector(
      "#input-religious-tradition"
    ).value;
    const biographyInput = document.querySelection("#input-biography").value;
    const imageInput = document.querySelector("#upload-image").files[0];
    const checkboxes = document.getElementsByName("monastery");
    const monasteryIds = super.getIds(checkboxes);
    Figure.postFigures(
      nameInput,
      lifespanInput,
      religiousTraditionInput,
      biographyInput,
      imageInput,
      monasteryIds
    );
  }

  renderEditForm(e, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    const form = document.createElement("form");
    contentContainer.appendChild(form);
    const monasteries = Monastery.allInstances;
    this.createEditInputs(form);
    this.createEditCheckboxes(form, monasteries);
    BuddhistEntity.createImageUpload(form, this.image_url);
    BuddhistEntity.createSubmit(form, "figure", "Edit");
    form.addEventListener("submit", (e) => this.createEditFormHandler(e));
  }

  createEditInputs(form) {
    const fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);
    const h2 = document.createElement("h2");
    h2.textContent = `Edit figure`;
    fieldset.appendChild(h2);
    fieldset.classList.add("d-flex", "flex-column", "align-items-left");
    const inputName = BuddhistEntity.createInputElement(
      "input-name",
      "text",
      "name",
      this.name,
      `Enter figure name`
    );
    fieldset.appendChild(inputName);
    const br = document.createElement("br");
    fieldset.appendChild(br);
    const inputLifespan = BuddhistEntity.createInputElement(
      `input-lifespan`,
      "text",
      "lifespan",
      this.lifespan,
      `Enter lifespan`
    );
    fieldset.appendChild(inputLifespan);
    fieldset.appendChild(br.cloneNode());
    const inputTradition = BuddhistEntity.createInputElement(
      "input-religious-tradition",
      "text",
      "religious-tradition",
      this.religious_tradition,
      "Enter religious tradition"
    );
    fieldset.appendChild(inputTradition);
    fieldset.appendChild(br.cloneNode());
    const inputBiography = BuddhistEntity.createInputElement(
      "input-biography",
      "text-area",
      "biography",
      this.biography,
      "Enter a short biography"
    );
    fieldset.appendChild(inputBiography);
    fieldset.appendChild(br.cloneNode());
  }

  createEditCheckboxes(form, monasteries) {
    const div = document.createElement("div");
    div.classList.add("container");
    form.appendChild(div);
    const fieldset = document.createElement("fieldset");
    const h3 = document.createElement("h3");
    h3.textContent = `Choose Associated Monasteries`;
    div.appendChild(h3);
    div.appendChild(fieldset);
    fieldset.classList.add("row", "row-cols-3");
    for (const monastery of monasteries) {
      const checked = this.monasteries.includes(monastery.name);
      const option = BuddhistEntity.createInputElement(
        `input-monastery-` + monastery.id,
        "checkbox",
        "monastery",
        monastery.id
      );
      option.checked = checked;
      BuddhistEntity.createCheckboxOption(option, monastery, fieldset);
    }
  }

  createEditFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const lifespanInput = document.querySelector("#input-lifespan").value;
    const religiousTraditionInput = document.querySelector(
      "#input-religious-tradition"
    ).value;
    const biographyInput = document.querySelector("#input-biographty").value;
    const checkboxes = document.getElementsByName("monastery");
    const imageInput = document.querySelector("#upload-image").files[0];
    const monasteryIds = BuddhistEntity.getIds(checkboxes);
    this.patchFigure(
      nameInput,
      lifespanInput,
      religiousTraditionInput,
      biographyInput,
      imageInput,
      monasteryIds
    );
  }
  static uploadImage(imageInput, id) {
    const formData = new FormData();
    formData.append("image", imageInput);
    fetch(`${FIGURES_URL}/${id}`, {
      method: "PATCH",
      body: formData,
    });
  }
  static postFigures(
    nameInput,
    lifespanInput,
    religiousTraditionInput,
    biographyInput,
    imageInput,
    monasteryIds
  ) {
    const bodyData = {
      name: nameInput,
      lifespan: lifespanInput,
      religious_tradition: religiousTraditionInput,
      monastery_ids: monasteryIds,
      biography: biographyInput,
    };
    fetch(FIGURES_URL, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then(() => {
        if (imageInput) {
          Figure.uploadImage(imageInput, this.id);
        }
      })
      .then(() => {
        Figure.fetchAndRenderFigures();
      });
  }

  patchFigure(
    nameInput,
    lifespanInput,
    religiousTraditionInput,
    biographyInput,
    imageInput,
    monasteryIds
  ) {
    let bodyData = {
      name: nameInput,
      lifespan: lifespanInput,
      religious_tradition: religiousTraditionInput,
      biography: biographyInput,
      monastery_ids: monasteryIds,
    };
    fetch(`${FIGURES_URL}/${this.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then(() => {
        if (imageInput) {
          Figure.uploadImage(imageInput, this.id);
        }
      })
      .then(() => {
        Figure.fetchAndRenderFigures();
      });
  }

  static createFromJson(data) {
    const figure = new Figure(
      data.id,
      data.attributes.name,
      data.attributes.lifespan,
      data.attributes.religious_tradition,
      data.attributes.biography,
      data.attributes.monasteries
    );
    return figure;
  }
  static deleteFigure(e, id) {
    const figureUrl = `${FIGURES_URL}/${id}`;
    fetch(figureUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      Figure.fetchAndRenderFigures();
    });
  }
}
