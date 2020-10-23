import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlace, fetchAncestryGroups } from "../../actions/placeActions";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
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
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: this.state.name,
      population: this.state.population,
      place_ancestry_groups_attributes: this.state.placeAncestryGroups.map(
        (group) => {
          return {
            ancestry_group_id: parseInt(group.ancestryGroupId),
            population: group.population,
          };
        }
      ),
    };
    console.log(this.props);
    this.props.addPlace(formData);
    this.props.fetchAncestryGroups();
    const placeAncestryGroups = this.state.placeAncestryGroups.map((group) => {
      return { ...group, population: 0 };
    });
    this.setState({
      name: "",
      population: 0,
      placeAncestryGroups,
    });
  };

  render() {
    let groups;
    if (this.state.placeAncestryGroups) {
      groups = [...this.state.placeAncestryGroups];
    } else if (this.props.placeAncestryGroups) {
      groups = [...this.props.placeAncestryGroups];
    } else {
      groups = [];
      return (
        <div>
          <h3>Loading, please wait.</h3>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <Form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <FormGroup>
            <Label>
              Place name
              <Input
                id="name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              Total population
              <Input
                id="population"
                name="population"
                type="number"
                value={this.state.population}
                onChange={this.handlePopulationChange}
              />
            </Label>
          </FormGroup>
          {groups.map((group) => {
            return (
              <FormGroup key={group.ancestryGroupId}>
                <Label>
                  {group.ancestryGroupName + " population"}
                  <Input
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
                </Label>
              </FormGroup>
            );
          })}
          <Button type="submit"> Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlace: (place) => dispatch(addPlace(place)),
    fetchAncestryGroups: () => dispatch(fetchAncestryGroups()),
  };
};
export default connect(null, mapDispatchToProps)(PlaceInput);
