import React, { Component } from "react";

class Places extends Component {
  render() {
    return this.props.places.map((place) => {
      return (
        <div className="place" key={place.id}>
          <h3><a href="">{place.attributes.name}</a></h3>
          <p>Population: {place.attributes.population}</p>
        </div>
      )
    })
  }
}

export default Places;