import React from "react";
import { Link } from "react-router-dom";

const Places = (props) => {
  if (props.places.length > 0) {
    return props.places.map((place) => {
      return (
        <div className="place" key={place.id}>
          <h3>
            <Link key={place.id} to={`/places/${place.id}`}>
              {place.attributes.name}
            </Link>
          </h3>
          <p>Population: {place.attributes.population}</p>
        </div>
      );
    });
  } else {
    return (
      <div>
        <h3>Loading, please wait.</h3>
      </div>
    );
  }
};

export default Places;
