import React from "react";
const Place = (props) => {
  console.log(props.places)
  console.log(props.match)
  const place = props.places[props.match.params.placeId]
  console.log(place)
  const placeCard = place ? (
    <div className="place">
      <h3>{place.attributes.name}</h3>
      <p>Population: {place.attributes.population}</p>
      <p>German-American: {place.attributes.percent_german}%</p>
      <p>African-American: {place.attributes.percent_african_american}%</p>
      <p>Mexican-American: {place.attributes.percent_mexican}%</p>
    </div>
  ) : "Place not found";
  return (
    <div>
      {placeCard}
    </div>
  )
}

export default Place;