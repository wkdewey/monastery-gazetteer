import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlace } from "../../actions/placeActions";

class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      population: 0,
      placeAncestryGroups: null,
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
  handleGroupChange = (event) => {};

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: this.state.name,
      population: this.state.population,
    };
    this.props.addPlace(formData);
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
          {this.props.placeAncestryGroups
            ? this.props.placeAncestryGroups.map((group) => {
                console.log(group);
                return (
                  <div key={group.ancestryGroupId}>
                    <label>
                      {group.ancestryGroupName + " population"}
                      <input
                        id={"population " + group.ancestryGroupName}
                        name={"population " + group.ancestryGroupName}
                        type="number"
                        value={group.population}
                        onChange={this.handleGroupChange}
                      />
                    </label>
                  </div>
                );
              })
            : null}
          <div>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { placeAncestryGroups: state.placeAncestryGroups };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPlace: (place) => dispatch(addPlace(place)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);
