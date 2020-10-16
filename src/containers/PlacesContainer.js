
import React, { Component } from 'react';
import { connect } from "react-redux";
import Places from "../components/places/Places"
import { BrowserRouter as Route, Switch } from "react-router-dom"
import Place from "../components/places/Place"
import PlaceInput from "../components/places/PlaceInput"

class PlacesContainer extends Component {
  render() {
    const places = this.props.places
    return (
      <div>
          <Switch>
            <Route exact path={this.props.match.url}>
              <Places places={places} />
            </Route>
            <Route path={`${this.props.match.url}/new`}>
              <PlaceInput />
            </Route>
            <Route path={`${this.props.match.url}/:placeId`} render={(routerProps) => <Place {...routerProps} places={places}/>}/>
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