class BuddhistEntity {
  constructor(id, name, religious_tradition, image_url) {
    this.id = id;
    this.name = name;
    this.religious_tradition = religious_tradition;
    this.image_url = image_url;
  }

  static fetchEntries(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json["data"]);
  }

  render(contentContainer, div, link) {
    div.classList.add("col-md-4");
    contentContainer.appendChild(div);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-4", "shadow-sm", "bg-danger", "p-3");
    div.appendChild(cardDiv);
    const h2 = document.createElement("h2");
    link.href = "#";
    link.textContent = this.name;
    link.classList.add("text-warning");
    h2.appendChild(link);
    cardDiv.appendChild(h2);
    const info = document.createElement("p");
    info.classList.add("card-text", "text-warning");
    cardDiv.appendChild(info);
    const tradition = document.createElement("p");
    tradition.textContent = "Religious tradition: " + this.religious_tradition;
    tradition.classList.add("card-text", "text-warning");
    cardDiv.appendChild(tradition);
    if (this.image_url) {
      let image = document.createElement("img");
      image.src = this.image_url;
      image.alt = `image of ${this.name}`;
      image.classList.add("card-img-bottom", "img-fluid");
      cardDiv.appendChild(image);
    }
  }
  static renderForm(model, form, collection, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.classList.remove("row");
    contentContainer.appendChild(form);
    form.autocomplete = "on";
    BuddhistEntity.createInputs(form, model);
    BuddhistEntity.createCheckboxes(form, model, collection);
    BuddhistEntity.createImageUpload(form);
    BuddhistEntity.createSubmit(form, model, "Create new");
  }

  static createInputs(form, model) {
    const fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);
    const h2 = document.createElement("h2");
    h2.textContent = `New ${model}`;
    fieldset.appendChild(h2);
    fieldset.classList.add("d-flex", "flex-column", "align-items-left");
    const inputName = BuddhistEntity.createInputElement(
      "input-name",
      "text",
      "name",
      "",
      `Enter ${model} name`
    );
    fieldset.appendChild(inputName);
    const br = document.createElement("br");
    fieldset.appendChild(br);
    const info = model === "monastery" ? "location" : "lifespan";
    const inputInfo = BuddhistEntity.createInputElement(
      `input-${info}`,
      "text",
      info,
      "",
      `Enter ${info}`
    );
    fieldset.appendChild(inputInfo);
    fieldset.appendChild(br.cloneNode());
    const inputTradition = BuddhistEntity.createInputElement(
      "input-religious-tradition",
      "text",
      "religious-tradition",
      "",
      "Enter religious tradition"
    );
    fieldset.appendChild(inputTradition);
    fieldset.appendChild(br.cloneNode());
  }

  static createCheckboxes(form, model, collection) {
    const associatedModel = model === "figure" ? "monastery" : "figure";
    const div = document.createElement("div");
    div.classList.add("container");
    form.appendChild(div);
    const fieldset = document.createElement("fieldset");
    const h3 = document.createElement("h3");
    h3.textContent = `Choose Associated ${
      model === "figure" ? "Monasteries" : "Figures"
    }`;
    div.appendChild(h3);
    div.appendChild(fieldset);
    fieldset.classList.add("row", "row-cols-3");
    for (const element of collection) {
      const option = BuddhistEntity.createInputElement(
        `input-${associatedModel}-` + element.id,
        "checkbox",
        associatedModel,
        element.id
      );
      BuddhistEntity.createCheckboxOption(option, element, fieldset);
    }
  }

  static createImageUpload(form, image_url = null) {
    const h3 = document.createElement("h3");
    if (image_url) {
      h3.textContent = "Upload new image";
      const img = document.createElement("img");
      img.src = image_url;
      img.alt = `existing image at ${image_url}`;
      img.width = "150";
      form.appendChild(img);
      form.appendChild(h3);
    } else {
      h3.textContent = "Upload image";
      form.appendChild(h3);
    }
    const upload = BuddhistEntity.createInputElement(
      "upload-image",
      "file",
      "filename"
    );
    upload.accept = "image/png, image/jpeg, image/gif";
    form.appendChild(upload);
    const br = document.createElement("br");
    form.appendChild(br);
  }
  static createSubmit(form, model, mode) {
    const submit = this.createInputElement(
      "create-button",
      "submit",
      "submit",
      `${mode} ${model}`
    );
    submit.classList.add("btn", "btn-sm", "btn-outline-secondary");
    form.appendChild(submit);
  }

  static createInputElement(id, type, name, value = null, placeholder) {
    const element = document.createElement("input");
    element.id = id;
    element.type = type;
    element.name = name;
    element.value = value;
    element.placeholder = placeholder;
    return element;
  }

  static createCheckboxOption(option, instance, fieldset) {
    const div = document.createElement("div");
    div.classList.add("form-check", "col");
    const label = document.createElement("label");
    label.for = option.id;
    label.textContent = instance.name;
    label.classList.add("form-check-label");
    option.classList.add("form-check-input");
    fieldset.appendChild(div);
    div.appendChild(option);
    div.appendChild(label);
  }

  static getIds(checkboxes) {
    return Array.prototype.slice
      .call(checkboxes)
      .filter((ch) => ch.checked == true)
      .map((ch) => parseInt(ch.value));
  }
}
