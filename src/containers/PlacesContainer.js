import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Places from "../components/places/Places"
import { Route } from "react-router-dom"

class PlacesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={match.url}>
            <Places places={this.props.places} />
          </Route>
          <Route path={`${match.url}/:placeId`} render={(routerProps) => <Place {...routerProps} place={this.props.places.find(place => place)} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { places: state.places }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesContainer)