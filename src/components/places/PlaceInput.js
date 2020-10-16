import React, { Component } from "react";

class PlaceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      population: 0,
      german_pop: 0,
      af_am_pop: 0,
      mexican_pop: 0,
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handlePopulationChange = (event) => {
    this.setState({
      population: event.target.value,
    });
  };

  handleGermanPopChange = (event) => {
    this.setState({
      german_pop: event.target.value,
    });
  };

  handleAfAmPopChange = (event) => {
    this.setState({
      af_am_pop: event.target.value,
    });
  };

  handleMexicanPopChange = (event) => {
    this.setState({
      mexican_pop: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: this.state.name,
      population: this.state.population,
      german_pop: this.state.german_pop,
      af_am_pop: this.state.af_am_pop,
      mexican_pop: this.state.mexican_pop,
    };
    this.props.handleLogin(formData);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <div>
            <label>
              Place name
              <input
                id="name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
          </div>
          <div>
            <label>
              Total population
              <input
                id="population"
                name="population"
                type="number"
                value={this.state.population}
                onChange={this.handlePopulationChange}
              />
            </label>
          </div>
          <div>
            <label>
              German-American population
              <input
                id="german_pop"
                name="german_pop"
                type="number"
                value={this.state.german_pop}
                onChange={this.handleGermanPopChange}
              />
            </label>
          </div>
          <div>
            <label>
              African-American population
              <input
                id="af_am_pop"
                name="af_am_pop"
                type="number"
                value={this.state.af_am_pop}
                onChange={this.handleAfAmPopChange}
              />
            </label>
          </div>
          <div>
            <label>
              Mexican-American population
              <input
                id="population"
                name="mexican_pop"
                type="number"
                value={this.state.mexican_pop}
                onChange={this.handleMexicanPopChange}
              />
            </label>
          </div>
          <div>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PlaceInput;
