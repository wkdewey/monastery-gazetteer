import React from "react";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const PlaceComparison = (props) => {
  let { placeId } = useParams();
  if (props.places.length > 0) {
    const place = props.places.find((place) => place.id === placeId);
    const groups = place.attributes.place_ancestry_groups;
    groups.sort((a, b) =>
      a.attributes.relative_to_national < b.attributes.relative_to_national
        ? 1
        : -1
    );
    const placeCard = place ? (
      <div className="place compared">
        <h3>Sorted by relative representation</h3>
        <p>(times the national average)</p>
        <ListGroup>
          {groups.map((group) => {
            return (
              <ListGroupItem className="ancestry group compared" key={group.id}>
                <p>
                  {group.attributes.ancestry_group.name}:{" "}
                  {group.attributes.relative_to_national}
                </p>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    ) : (
      "Place not found"
    );
    return <div>{placeCard}</div>;
  } else {
    return null;
  }
};

export default PlaceComparison;
