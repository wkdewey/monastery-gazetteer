import React, { Component } from "react";
import { connect } from "react-redux";
import Places from "../components/places/Places";
import { Route, Switch } from "react-router-dom";
import Place from "../components/places/Place";
import PlaceComparison from "../components/places/PlaceComparison";
import PlaceInput from "../components/places/PlaceInput";

class PlacesContainer extends Component {
  render() {
    const places = this.props.places;
    const placeAncestryGroups = this.props.placeAncestryGroups;
    return (
      <div>
        <Switch>
          <Route path={`${this.props.match.path}/new`}>
            <PlaceInput placeAncestryGroups={placeAncestryGroups} />
          </Route>
          <Route path={`${this.props.match.path}/:placeId`}>
            <Place places={places} />
            <PlaceComparison places={places} />
          </Route>
          <Route path={this.props.match.path}>
            <Places places={places} />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { places: state.places };
};

export default connect(mapStateToProps)(PlacesContainer);
