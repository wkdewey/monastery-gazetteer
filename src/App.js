import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux";
import { fetchPlaces } from "./actions/placeActions";
import "./App.css";
import NavBar from "./components/NavBar"
import PlacesContainer from "./containers/PlacesContainer"
import Home from "./components/Home"

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
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/places" component={PlacesContainer} />
    
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
