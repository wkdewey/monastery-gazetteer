class Monastery {
  constructor(name, location, religious_tradition, figures) {
    this.name = name;
    this.location = location;
    this.religious_tradition = religious_tradition;
    if (figures) {
      this.figures = [];
      for (const figure of figures) {
        const figureName = figure["name"];
        this.figures.push(figureName);
      }
    }
    Monastery.allInstances.push(this);
  }
  render() {
    const contentContainer = document.querySelector("#content-container");
    const div = document.createElement("div");
    div.classList.add("monastery-card");
    contentContainer.appendChild(div);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = this.name;
    link.addEventListener("click", this.showAssociatedFigures.bind(this));
    h2.appendChild(link);
    div.appendChild(h2);
    const location = document.createElement("p");
    location.textContent = "Location: " + this.location;
    div.appendChild(location);
    const tradition = document.createElement("p");
    tradition.textContent = "Religious tradition: " + this.religious_tradition;
    div.appendChild(tradition);
  }
  showAssociatedFigures() {
    const contentContainer = document.querySelector("#content-container");
    contentContainer.textContent = "";
    this.render();
    let figures = document.createElement("h3");
    figures.textContent = "Associated Figures";
    contentContainer.appendChild(figures);
    for (const figure of this.figures) {
      const figureObject = Figure.find(figure);
      figureObject.render();
    }
  }

  static find(name) {
    const found = Monastery.allInstances.find(
      (monastery) => monastery.name === name
    );
    return found;
  }
}
Monastery.allInstances = [];
