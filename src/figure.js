class Figure extends BuddhistEntity {
  constructor(
    id,
    name,
    birth_date,
    death_date,
    religious_tradition,
    monasteries,
    biography,
    image_url,
    monastery_figures
  ) {
    super(id, name, religious_tradition, image_url);
    this.birth_date = birth_date;
    this.death_date = death_date;
    this.biography = biography;
    if (monasteries) {
      this.monasteries = [];
      for (const monastery of monasteries) {
        const monasteryName = monastery["name"];
        this.monasteries.push(monasteryName);
      }
    }
    if (monastery_figures) {
      this.monastery_figures = [];
      for (const monastery_figure of monastery_figures) {
        this.monastery_figures.push(monastery_figure);
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
        data[key]["attributes"]["birth_date"],
        data[key]["attributes"]["death_date"],
        data[key]["attributes"]["religious_tradition"],
        data[key]["attributes"]["monasteries"],
        data[key]["attributes"]["biography"],
        data[key]["attributes"]["image_url"],
        data[key]["attributes"]["monastery_figures"]
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
    lifespan.textContent =
      "Lifespan: " + this.birth_date + "-" + this.death_date;
  }
  renderFigure(contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");

    this.render(contentContainer);
    const card = contentContainer.querySelector("div div");
    const column = contentContainer.querySelector("div");
    column.classList.remove("col-md-4");
    const bio = document.createElement("p");
    bio.textContent = this.biography;
    card.appendChild(bio);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete figure";
    contentContainer.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) =>
      Figure.deleteFigure(e, this.id)
    );
    let editButton = document.createElement("button");
    editButton.textContent = "Edit figure";
    contentContainer.appendChild(editButton);
    editButton.addEventListener("click", (e) =>
      this.renderEditForm(e, contentContainer, this)
    );
    let editAssociatedButton = document.createElement("button");
    editAssociatedButton.textContent = "Edit relationships"; // How do I want to change this language
    contentContainer.appendChild(editAssociatedButton);
    editAssociatedButton.addEventListener("click", (e) =>
      this.renderAssociatedForm(e, contentContainer, this)
    );
    let monasteries = document.createElement("h3");
    monasteries.textContent = "Associated Monasteries";
    contentContainer.appendChild(monasteries);
    for (const monastery of this.monasteries) {
      const monasteryObject = Monastery.find(monastery);
      const monasteryFigureObject = this.monastery_figures.find(
        ({ monastery_id }) => monastery_id === monasteryObject.id
      );
      monasteryObject.render(contentContainer, monasteryFigureObject);
    }
  }

  static renderForm() {
    const contentContainer = document.querySelector("#content-container");
    const form = document.createElement("form");
    const monasteries = Monastery.allInstances;
    super.createForm("figure", form, contentContainer);
    const fieldset = document.querySelector("fieldset");
    const br = document.createElement("br");
    const inputBiography = document.createElement("textarea");
    inputBiography.id = "input-biography";
    inputBiography.name = "biography";
    // inputBiography.value = this.biography;
    inputBiography.placeholder = "Enter a short biography, if desired";
    fieldset.appendChild(inputBiography);
    fieldset.appendChild(br.cloneNode());
    super.completeForm("figure", form, monasteries);
    form.addEventListener("submit", (e) => Figure.createFigureFormHandler(e));
  }

  static createFigureFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const birthDateInput = document.querySelector("#input-birth-date").value;
    const deathDateInput = document.querySelector("#input-death-date").value;
    const religiousTraditionInput = document.querySelector(
      "#input-religious-tradition"
    ).value;
    const biographyInput = document.querySelector("#input-biography").value;
    const imageInput = document.querySelector("#upload-image").files[0];
    const checkboxes = document.getElementsByName("monastery");
    const monasteryIds = super.getIds(checkboxes);
    Figure.postFigures(
      nameInput,
      birthDateInput,
      deathDateInput,
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
    const inputBirthDate = BuddhistEntity.createInputElement(
      `input-birth-date`,
      "text",
      "birth_date",
      this.birth_date,
      `Enter birth date`
    );
    fieldset.appendChild(inputBirthDate);
    fieldset.appendChild(br.cloneNode());
    const inputDeathDate = BuddhistEntity.createInputElement(
      `input-death-date`,
      "text",
      "death_date",
      this.death_date,
      `Enter death date`
    );
    fieldset.appendChild(inputDeathDate);
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
    const inputBiography = document.createElement("textarea");
    inputBiography.id = "input-biography";
    inputBiography.name = "biography";
    inputBiography.value = this.biography;
    inputBiography.placeholder = "Enter a short biography, if desired";
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
    const birthDateInput = document.querySelector("#input-birth-date").value;
    const deathDateInput = document.querySelector("#input-death-date").value;
    const religiousTraditionInput = document.querySelector(
      "#input-religious-tradition"
    ).value;
    const biographyInput = document.querySelector("#input-biography").value;
    const checkboxes = document.getElementsByName("monastery");
    const imageInput = document.querySelector("#upload-image").files[0];
    const monasteryIds = BuddhistEntity.getIds(checkboxes);
    this.patchFigure(
      nameInput,
      birthDateInput,
      deathDateInput,
      religiousTraditionInput,
      biographyInput,
      imageInput,
      monasteryIds
    );
  }

  renderAssociatedForm(e, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    const monasteryFigures = this.monastery_figures;
    const h2 = document.createElement("h2");
    h2.textContent = `Edit figure's relationships with monasteries`;
    contentContainer.appendChild(h2);
    monasteryFigures.forEach((monasteryFigure, index) => {
      const form = document.createElement("form");
      const fieldset = document.createElement("fieldset");
      contentContainer.appendChild(form);
      this.createAssociatedInputs(form, fieldset, monasteryFigure, index);
      fieldset.classList.add("d-flex", "flex-column", "align-items-left");
      BuddhistEntity.createSubmit(form, "figure", "Edit");
      form.addEventListener("submit", (e) =>
        this.createAssociatedFormHandler(e, monasteryFigure, index, this)
      );
    });
  }

  createAssociatedInputs(form, fieldset, monasteryFigure, index) {
    form.appendChild(fieldset);
    const h3 = document.createElement("h3");
    const monastery = Monastery.allInstances.find(
      (monastery) => monastery.id === monasteryFigure.monastery_id
    );
    h3.textContent = monastery.name;
    fieldset.appendChild(h3);
    //create input element takes in id, type, name, value, placeholder
    //id should be unique to the monastery-figure; value should be what's already ther
    const inputRole = BuddhistEntity.createInputElement(
      `input-role-${index}`,
      "text",
      "role",
      monasteryFigure.role,
      "What role did this figure play at this monastery?"
    );
    fieldset.appendChild(inputRole);
    const inputStory = document.createElement("textarea");
    fieldset.appendChild(inputStory);
    inputStory.id = `input-story-${index}`;
    inputStory.name = "story";
    inputStory.value = monasteryFigure.story;
    inputStory.placeholder = "Describe the figure's sojourn at this monastery";
    const inputTeachings = BuddhistEntity.createInputElement(
      `input-teachings-${index}`,
      "text",
      "teachings",
      monasteryFigure.associated_teaching,
      "What teaching are associated with this monastery?"
    );
    fieldset.appendChild(inputTeachings);
  }

  createAssociatedFormHandler(e, monasteryFigure, index) {
    e.preventDefault();
    const roleInput = document.querySelector(`#input-role-${index}`).value;
    const storyInput = document.querySelector(`#input-story-${index}`).value;
    const teachingsInput = document.querySelector(
      `#input-teachings-${index}`
    ).value;
    //how do I get the monasteryID?
    const monasteryFigureId = monasteryFigure.id;
    this.patchMonasteryFigure(
      roleInput,
      storyInput,
      teachingsInput,
      monasteryFigureId
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
    birthDateInput,
    deathDateInput,
    religiousTraditionInput,
    biographyInput,
    imageInput,
    monasteryIds
  ) {
    const bodyData = {
      name: nameInput,
      birth_date: birthDateInput,
      death_date: deathDateInput,
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
    birthDateInput,
    deathDateInput,
    religiousTraditionInput,
    biographyInput,
    imageInput,
    monasteryIds
  ) {
    let bodyData = {
      name: nameInput,
      birth_date: birthDateInput,
      death_date: deathDateInput,
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

  patchMonasteryFigure(
    roleInput,
    storyInput,
    teachingsInput,
    monasteryFigureId
  ) {
    let bodyData = {
      role: roleInput,
      story: storyInput,
      associated_teaching: teachingsInput,
    };
    fetch(`${MONASTERY_FIGURES_URL}/${monasteryFigureId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    }).then(() => {
      Figure.fetchAndRenderFigures();
    });
  }

  static createFromJson(data) {
    const figure = new Figure(
      data.id,
      data.attributes.name,
      data.attributes.birth_date,
      data.attributes.death_date,
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
