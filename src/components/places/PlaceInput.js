import React from "react";

class PlaceInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      population: 0,
      german_pop: 0,
      af_am_pop: 0,
      mexican_pop: 0
    }
  }

  render() {
    return (
      <form>
        <div><label>Place name<input id="name" name="name" type="text" value={this.state.name} /></label></div>
        <div><label>Total population<input id="population" name="population" type="number" value={this.state.population} /></label></div>
        <div><label>German-American population<input id="population" name="german_pop" type="number" value={this.state.german_pop} /></label></div>
        <div><label>African-American population<input id="population" name="af_am_pop" type="number" value={this.state.af_am_pop} /></label></div>
        <div><label>Mexican-American population<input id="population" name="mexican_pop" type="number" value={this.state.mexican_pop} /></label></div>
        <div><button type="submit"> Submit</button></div>
      </form>
    )
  }
}