class BuddhistEntity {
  constructor(id, name, religious_tradition) {
    this.id = id;
    this.name = name;
    this.religious_tradition = religious_tradition;
  }

  render() {
    const contentContainer = document.querySelector("#content-container");
    const div = document.createElement("div");
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
    const link = document.createElement("a");
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
  clearAndRender() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    this.render();
  }
  static showForm(model) {
    const h2 = document.createElement("h2");
    const form = document.createElement("form");
    const br = document.createElement("br");
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    contentContainer.appendChild(form);
    form.appendChild(h2);
    form.classList.add("d-flex", "flex-column", "align-items-center");
    const inputName = this.createInputElement(
      "input-name",
      "text",
      "name",
      "",
      `Enter ${model} name`
    );
    form.appendChild(inputName);
    form.appendChild(br);
    const inputTradition = this.createInputElement(
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
    const submit = Helpers.createInputElement(
      "create-button",
      "submit",
      "submit",
      `Create new ${model}`
    );
    submit.classList.add("btn", "btn-sm", "btn-outline-secondary");
    form.appendChild(submit);
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
}
