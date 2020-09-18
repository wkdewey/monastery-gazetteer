class Helpers {
  static createInputElement(id, type, name, value, placeholder) {
    element = document.createElement("input");
    element.id = id;
    element.type = type;
    element.name = name;
    element.value = value;
    element.placeholder = placeholder;
    return element;
  }
}
