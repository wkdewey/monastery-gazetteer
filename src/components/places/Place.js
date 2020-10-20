import React from "react";
import { useParams } from "react-router-dom";

const Place = (props) => {
  let { placeId } = useParams();
  const place = props.places[placeId - 1];
  const groups = place.attributes.placeAncestryGroups;
  groups.sort((a, b) => (a.attributes.percent < b.attributes.percent ? 1 : -1));
  const placeCard = place ? (
    <div className="place">
      <h3>{place.attributes.name}</h3>
      <p>Population: {place.attributes.population}</p>
      {groups.map((group) => {
        return (
          <div className="ancestry group" key={group.id}>
            <p>
              {group.attributes.ancestryGroup.name}: {group.attributes.percent}%
            </p>
          </div>
        );
      })}
    </div>
  ) : (
    "Place not found"
  );
  return <div>{placeCard}</div>;
};

export default Place;
