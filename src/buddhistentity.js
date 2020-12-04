class BuddhistEntity {
  constructor(id, name, religious_tradition) {
    this.id = id;
    this.name = name;
    this.religious_tradition = religious_tradition;
  }

  static fetchEntries(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json["data"]);
  }

  render(contentContainer, div, link) {
    div.classList.add(
      "album",
      "py-5",
      "bg-light",
      "col-md-4",
      "card",
      "mb-4",
      "shadow-sm",
      "card-body"
    );
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    link.href = "#";
    link.textContent = this.name;
    h2.appendChild(link);
    div.appendChild(h2);
    const info = document.createElement("p");
    info.classList.add("card-text");
    div.appendChild(info);
    const tradition = document.createElement("p");
    tradition.textContent = "Religious tradition: " + this.religious_tradition;
    tradition.classList.add("card-text");
    div.appendChild(tradition);
  }
  static showForm(model, form, contentContainer) {
    contentContainer.textContent = "";
    contentContainer.appendChild(form);
    const h2 = document.createElement("h2");
    h2.textContent = `New ${model}`;
    form.appendChild(h2);
    form.classList.add("d-flex", "flex-column", "align-items-center");
    const inputName = BuddhistEntity.createInputElement(
      "input-name",
      "text",
      "name",
      "",
      `Enter ${model} name`
    );
    form.appendChild(inputName);
    const br = document.createElement("br");
    form.appendChild(br);
    const info = model === "monastery" ? "location" : "lifespan";
    const inputInfo = BuddhistEntity.createInputElement(
      `input-${info}`,
      "text",
      info,
      "",
      `Enter ${info}`
    );
    form.appendChild(inputInfo);
    form.appendChild(br.cloneNode());
    const inputTradition = BuddhistEntity.createInputElement(
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
    h3.textContent = `Choose Associated ${
      model === "figure" ? "Monasteries" : "Figures"
    }`;
    form.appendChild(h3);
    const submit = BuddhistEntity.createInputElement(
      "create-button",
      "submit",
      "submit",
      `Create new ${model}`
    );
    submit.classList.add("btn", "btn-sm", "btn-outline-secondary");
    form.appendChild(submit);
  }

  static createCheckboxes(collection, model, form) {
    for (const element of collection) {
      const option = BuddhistEntity.createInputElement(
        `input-${model}-` + element.id,
        "checkbox",
        model,
        element.id
      );
      BuddhistEntity.createCheckboxOption(option, element, form);
    }
  }

  static createInputElement(id, type, name, value, placeholder) {
    const element = document.createElement("input");
    element.id = id;
    element.type = type;
    element.name = name;
    element.value = value;
    element.placeholder = placeholder;
    return element;
  }

  static createCheckboxOption(option, instance, form) {
    const label = document.createElement("label");
    label.for = option.id;
    label.textContent = instance.name;
    const submit = form.querySelector("#create-button");
    form.insertBefore(option, submit);
    form.insertBefore(label, submit);
    const br = document.createElement("br");
    form.insertBefore(br, submit);
  }

  static getIds(checkboxes) {
    return Array.prototype.slice
      .call(checkboxes)
      .filter((ch) => ch.checked == true)
      .map((ch) => parseInt(ch.value));
  }
}
