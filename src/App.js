import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlaces } from "./actions/placeActions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Welcome to American Ancestries.</p>
        </header>

      </div>
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
