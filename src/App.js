import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPlaces, fetchAncestryGroups } from "./actions/placeActions";
import "./App.css";
import NavBar from "./components/NavBar";
import PlacesContainer from "./containers/PlacesContainer";
import AncestryGroupsContainer from "./containers/AncestryGroupsContainer";
import Home from "./components/Home";

class App extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
    this.props.fetchAncestryGroups();
  }
  render() {
    console.log(this.props.place_ancestry_groups);
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route
              path="/places"
              render={(routerProps) => {
                console.log("PlacesContainer is being rendered");
                return (
                  <PlacesContainer
                    {...routerProps}
                    places={this.props.places}
                    ancestry_groups={this.props.ancestry_groups}
                    place_ancestry_groups={this.props.place_ancestry_groups}
                  />
                );
              }}
            />
            <Route
              path="/ancestry_groups"
              render={(routerProps) => {
                console.log("AncestryGroupsContainer is being rendered");
                return (
                  <AncestryGroupsContainer
                    {...routerProps}
                    ancestry_groups={this.props.ancestry_groups}
                  />
                );
              }}
            />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    places: state.places,
    ancestry_groups: state.ancestry_groups,
    place_ancestry_groups: state.place_ancestry_groups,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: () => dispatch(fetchPlaces()),
    fetchAncestryGroups: () => dispatch(fetchAncestryGroups()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
