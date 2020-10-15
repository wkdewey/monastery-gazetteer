import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux";
import { fetchPlaces } from "./actions/placeActions";
import "./App.css";
import NavBar from "./components/NavBar"
import PlacesContainer from "./containers/PlacesContainer"

class App extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/">
        <header className="App-header">
          <p>Welcome to American Ancestries.</p>
        </header>
          </Route>
          <Route path="/places">
        <PlacesContainer />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: () => dispatch(fetchPlaces()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
