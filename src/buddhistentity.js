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
}
