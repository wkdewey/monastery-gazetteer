import React from "react";
import { useParams } from "react-router-dom";

const PlaceComparison = (props) => {
  let { placeId } = useParams();
  const place = props.places[placeId - 1];
  const groups = place.attributes.placeAncestryGroups;
  groups.sort((a, b) =>
    a.attributes.relativeToNational < b.attributes.relativeToNational ? 1 : -1
  );
  const placeCard = place ? (
    <div className="place compared">
      <h3>Relative representation of groups</h3>
      <p>(times the national average)</p>
      {groups.map((group) => {
        return (
          <div className="ancestry group compared" key={group.id}>
            <p>
              {group.attributes.ancestryGroup.name}:{" "}
              {group.attributes.relativeToNational}
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
