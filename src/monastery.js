class Monastery extends BuddhistEntity {
  constructor(
    id,
    name,
    location,
    religious_tradition,
    figures,
    image_url,
    monastery_figures
  ) {
    super(id, name, religious_tradition, image_url);
    this.location = location;
    if (figures) {
      this.figures = [];
      for (const figure of figures) {
        const figureName = figure["name"];
        this.figures.push(figureName);
      }
      if (monastery_figures) {
        this.monastery_figures = [];
        for (const monastery_figure of monastery_figures) {
          this.monastery_figures.push(monastery_figure);
        }
      }
    }

    Monastery.allInstances.push(this);
  }

  static fetchMonasteries() {
    return super
      .fetchEntries(MONASTERIES_URL)
      .then((data) => Monastery.initialize(data));
  }

  static fetchAndRenderMonasteries() {
    Monastery.allInstances = [];
    return super
      .fetchEntries(MONASTERIES_URL)
      .then((data) => Monastery.initialize(data))
      .then(() => Monastery.renderMonasteries());
  }

  static initialize(data) {
    for (const key in data) {
      new Monastery(
        data[key]["id"],
        data[key]["attributes"]["name"],
        data[key]["attributes"]["location"],
        data[key]["attributes"]["religious_tradition"],
        data[key]["attributes"]["figures"],
        data[key]["attributes"]["image_url"],
        data[key]["attributes"]["monastery_figures"]
      );
    }
  }

  static find(name) {
    const found = Monastery.allInstances.find(
      (monastery) => monastery.name === name
    );
    return found;
  }

  static renderMonasteries() {
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

  render(contentContainer, monasteryFigureObject = null) {
    const div = document.createElement("div");
    const link = document.createElement("a");
    super.render(contentContainer, div, link);
    link.addEventListener("click", () => {
      this.renderMonastery(contentContainer);
    });
    const location = div.querySelector("p");
    location.textContent = "Location: " + this.location;
    const card = div.querySelector("div.card");
    if (monasteryFigureObject) {
      this.renderMonasteryFigure(card, monasteryFigureObject);
    }
  }

  renderMonastery(contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    this.render(contentContainer);
    const card = contentContainer.querySelector("div div");
    const column = contentContainer.querySelector("div");
    column.classList.remove("col-md-4");
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
      this.renderEditForm(e, contentContainer, this)
    );
    let editAssociatedButton = document.createElement("button");
    editAssociatedButton.textContent = "Edit relationships"; // How do I want to change this language
    contentContainer.appendChild(editAssociatedButton);
    editAssociatedButton.addEventListener("click", (e) =>
      this.renderAssociatedForm(e, contentContainer, this)
    );
    let figures = document.createElement("h3");
    figures.textContent = "Associated Figures";
    contentContainer.appendChild(figures);
    for (const figure of this.figures) {
      const figureObject = Figure.find(figure);
      const monasteryFigureObject = this.monastery_figures.find(
        ({ monastery_id }) => monastery_id === figureObject.id
      );
      figureObject.render(contentContainer, monasteryFigureObject);
    }
  }

  renderMonasteryFigure(contentContainer, monasteryFigure) {
    let role = document.createElement("p");
    role.textContent = "Role played at monastery: " + monasteryFigure.role;
    contentContainer.appendChild(role);
    let story = document.createElement("p");
    story.textContent = monasteryFigure.story;
    contentContainer.appendChild(story);
    let associated_teaching = document.createElement("p");
    associated_teaching.textContent =
      "Associated teachings: " + monasteryFigure.associated_teaching;
    contentContainer.appendChild(associated_teaching);
  }

  static renderForm() {
    const contentContainer = document.querySelector("#content-container");
    const form = document.createElement("form");
    const figures = Figure.allInstances;
    super.createForm("monastery", form, contentContainer);
    super.completeForm("monastery", form, figures);
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
    const imageInput = document.querySelector("#upload-image").files[0];
    const checkboxes = document.getElementsByName("figure");
    const figureIds = super.getIds(checkboxes);
    Monastery.postMonasteries(
      nameInput,
      locationInput,
      religiousTraditionInput,
      imageInput,
      figureIds
    );
  }

  renderEditForm(e, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    const form = document.createElement("form");
    contentContainer.appendChild(form);
    const figures = Figure.allInstances;
    this.createEditInputs(form);
    this.createEditCheckboxes(form, figures);
    BuddhistEntity.createImageUpload(form, this.image_url);
    BuddhistEntity.createSubmit(form, "monastery", "Edit");
    form.addEventListener("submit", (e) => this.createEditFormHandler(e));
  }

  createEditInputs(form) {
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
      this.name,
      `Enter monastery name`
    );
    fieldset.appendChild(inputName);
    const br = document.createElement("br");
    fieldset.appendChild(br);
    const inputLocation = BuddhistEntity.createInputElement(
      `input-location`,
      "text",
      "location",
      this.location,
      `Enter location`
    );
    fieldset.appendChild(inputLocation);
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
  }

  createEditCheckboxes(form, figures) {
    const div = document.createElement("div");
    div.classList.add("container");
    form.appendChild(div);
    const fieldset = document.createElement("fieldset");
    const h3 = document.createElement("h3");
    h3.textContent = `Choose Associated Figures`;
    div.appendChild(h3);
    div.appendChild(fieldset);
    fieldset.classList.add("row", "row-cols-3");
    for (const figure of figures) {
      const checked = this.figures.includes(figure.name);
      const option = BuddhistEntity.createInputElement(
        `input-figure-` + figure.id,
        "checkbox",
        "figure",
        figure.id
      );
      option.checked = checked;
      BuddhistEntity.createCheckboxOption(option, figure, fieldset);
    }
  }

  createEditFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const locationInput = document.querySelector("#input-location").value;
    const religiousTraditionInput = document.querySelector(
      "#input-religious-tradition"
    ).value;
    const checkboxes = document.getElementsByName("figure");
    const imageInput = document.querySelector("#upload-image").files[0];
    const figureIds = BuddhistEntity.getIds(checkboxes);
    this.patchMonastery(
      nameInput,
      locationInput,
      religiousTraditionInput,
      imageInput,
      figureIds
    );
  }
  renderAssociatedForm(e, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    const monasteryFigures = this.monastery_figures;
    const h2 = document.createElement("h2");
    h2.textContent = `Edit ${this.name} monastery's relationships with figures`;
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
    const figure = Figure.allInstances.find(
      (figure) => figure.id === monasteryFigure.figure_id
    );
    h3.textContent = figure.name;
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
      "What teaching are associated with this figure at this monastery?"
    );
    fieldset.appendChild(inputTeachings);
  }
  static uploadImage(imageInput, id) {
    const formData = new FormData();
    formData.append("image", imageInput);
    fetch(`${MONASTERIES_URL}/${id}`, {
      method: "PATCH",
      body: formData,
    });
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
  static postMonasteries(
    nameInput,
    locationInput,
    religiousTraditionInput,
    imageInput,
    figureIds
  ) {
    const bodyData = {
      name: nameInput,
      location: locationInput,
      religious_tradition: religiousTraditionInput,
      figure_ids: figureIds,
    };
    fetch(MONASTERIES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then(() => {
        if (imageInput) {
          Monastery.uploadImage(imageInput, this.id);
        }
      })
      .then(() => {
        Monastery.fetchAndRenderMonasteries();
      });
  }

  patchMonastery(
    nameInput,
    locationInput,
    religiousTraditionInput,
    imageInput,
    figureIds
  ) {
    let bodyData = {
      name: nameInput,
      location: locationInput,
      religious_tradition: religiousTraditionInput,
      figure_ids: figureIds,
    };
    fetch(`${MONASTERIES_URL}/${this.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then(() => {
        if (imageInput) {
          Monastery.uploadImage(imageInput, this.id);
        }
      })
      .then(() => {
        Monastery.fetchAndRenderMonasteries();
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
    }).then(() => {
      Monastery.fetchAndRenderMonasteries();
    });
  }
}
