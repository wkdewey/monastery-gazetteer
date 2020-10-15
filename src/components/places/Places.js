import React from "react";

const Places = (props) => (props.places.map((place) => {
      return (
        <div className="place" key={place.id}>
          <h3><a href="">{place.attributes.name}</a></h3>
          <p>Population: {place.attributes.population}</p>
        </div>
      )
    })
);

export default Places;