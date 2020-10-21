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
      population: parseInt(event.target.value),
    });
  };
  handleGroupChange = (groups, id, event) => {
    // debugger;
    let group = { ...groups[id] };
    group.population = parseInt(event.target.value);
    groups[id] = group;
    this.setState({
      placeAncestryGroups: groups,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: this.state.name,
      population: this.state.population,
      placeAncestryGroups: this.state.placeAncestryGroups,
    };
    this.props.addPlace(formData);
  };

  render() {
    let groups;
    if (this.state.placeAncestryGroups) {
      groups = [...this.state.placeAncestryGroups];
    } else if (this.props.placeAncestryGroups) {
      groups = [...this.props.placeAncestryGroups];
    } else {
      groups = [];
    }
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
          {groups.map((group) => {
            return (
              <div key={group.ancestryGroupId}>
                <label>
                  {group.ancestryGroupName + " population"}
                  <input
                    id={"population " + group.ancestryGroupName}
                    name={"population " + group.ancestryGroupName}
                    type="number"
                    value={group.population}
                    onChange={(e) =>
                      this.handleGroupChange(
                        groups,
                        parseInt(group.ancestryGroupId) - 1,
                        e
                      )
                    }
                  />
                </label>
              </div>
            );
          })}
          ;
          <div>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlace: (place) => dispatch(addPlace(place)),
  };
};
export default connect(null, mapDispatchToProps)(PlaceInput);
