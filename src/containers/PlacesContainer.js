import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Places from "../components/places/Places"

class PlacesContainer extends Component {
  render() {
    return (
      <div>
        <Places places={this.props.places} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { places: state.places }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer)