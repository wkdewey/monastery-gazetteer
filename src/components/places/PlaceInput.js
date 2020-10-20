import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlace } from "../../actions/placeActions";

class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      population: 0,
      place_ancestry_groups: null,
    };
  }

  // componentDidMount() {
  //   // this.props.fetchAncestryGroups();
  //   this.setState({
  //     place_ancestry_groups: this.props.place_ancestry_groups,
  //   });
  // }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handlePopulationChange = (event) => {
    console.log(this.state);
    this.setState({
      population: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: this.state.name,
      population: this.state.population,
    };
    console.log(formData);
    this.props.addPlace(formData);
  };

  render() {
    console.log(this.state);
    console.log(this.props.place_ancestry_groups);
    console.log(this.state.place_ancestry_groups);
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
          {this.props.place_ancestry_groups
            ? this.props.place_ancestry_groups.map((group) => {
                console.log(group);
                return (
                  <div>
                    <label>
                      Id: {group.id}
                      <input type="number" value={group.population} />
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
  return { place_ancestry_groups: state.place_ancestry_groups };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPlace: (place) => dispatch(addPlace(place)),
    // fetchAncestryGroups: () => dispatch(fetchAncestryGroups()),
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchPlaces: () => dispatch(fetchPlaces()),

//   };
// };
export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);
