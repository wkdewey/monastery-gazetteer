import React from "react";
import { useParams } from "react-router-dom";

const Place = (props) => {
  let { placeId } = useParams();
  if (props.places.length > 0) {
    const place = props.places[placeId - 1];
    console.log(`place is ${place}`);
    const groups = place.attributes.place_ancestry_groups;
    groups.sort((a, b) =>
      a.attributes.percent < b.attributes.percent ? 1 : -1
    );
    const placeCard = place ? (
      <div className="place">
        <h3>{place.attributes.name}</h3>
        <p>Population: {place.attributes.population}</p>
        {groups.map((group) => {
          return (
            <div className="ancestry group" key={group.id}>
              <p>
                {group.attributes.ancestry_group.name}:{" "}
                {group.attributes.percent}%
              </p>
            </div>
          );
        })}
      </div>
    ) : (
      "Place not found"
    );
    return <div>{placeCard}</div>;
  } else
    return (
      <div>
        <h3>Loading, please wait.</h3>
      </div>
    );
};

export default Place;
