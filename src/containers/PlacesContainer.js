import React, { Component } from "react";
import { connect } from "react-redux";
import Places from "../components/places/Places";
import { Route, Switch } from "react-router-dom";
import Place from "../components/places/Place";
import PlaceComparison from "../components/places/PlaceComparison";
import PlaceInput from "../components/places/PlaceInput";
import { fetchPlaces } from "../actions/placeActions";
import { fetchAncestryGroups } from "../actions/ancestryGroupActions";

class PlacesContainer extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
    this.props.fetchAncestryGroups();
  }

  render() {
    const places = this.props.places;
    console.log(places);
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
  return {
    places: state.places,
    placeAncestryGroups: state.placeAncestryGroups,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: () => dispatch(fetchPlaces()),
    fetchAncestryGroups: () => dispatch(fetchAncestryGroups()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer);
