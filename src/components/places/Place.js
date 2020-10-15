import React from "react";
const Place = ({ match, places }) => {
  console.log(places)
  const place = places[match.params.placeId]
      return (
        <div className="place">
          <h3>{place.name}</h3>
          <p>Population: {place.population}</p>
        </div>
      )
}

export default Place;