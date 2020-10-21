import React from "react";
import { useParams } from "react-router-dom";

const PlaceComparison = (props) => {
  let { placeId } = useParams();
  const place = props.places[placeId - 1];
  const groups = place.attributes.place_ancestry_groups;
  groups.sort((a, b) =>
    a.attributes.relative_to_national < b.attributes.relative_to_national
      ? 1
      : -1
  );
  const placeCard = place ? (
    <div className="place compared">
      <h3>Relative representation of groups</h3>
      <p>(times the national average)</p>
      {groups.map((group) => {
        return (
          <div className="ancestry group compared" key={group.id}>
            <p>
              {group.attributes.ancestry_group.name}:{" "}
              {group.attributes.relative_to_national}
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

export default PlaceComparison;
