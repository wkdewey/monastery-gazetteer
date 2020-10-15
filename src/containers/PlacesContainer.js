import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Places from "../components/places/Places"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Place from "../components/places/Place"

class PlacesContainer extends Component {
  render() {
    console.log(`in PlacesContainer, this.props is ${JSON.stringify(this.state.places)}`)
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={this.props.match.url}>
              <Places places={this.props.places} />
            </Route>
            <Route path={`${this.props.match.url}/:placeId`} render={(routerProps) => <Place {...routerProps} places={this.props.places} />} />
          </Switch>
        </Router>
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