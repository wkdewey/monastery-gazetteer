import React from "react";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const PlaceComparison = (props) => {
  let { placeId } = useParams();
  if (props.places.length > 0) {
    const place = props.places.find((place) => place.id === placeId);
    let placeCard;
    if (place) {
      const groups = place.attributes.place_ancestry_groups;
      groups.sort((a, b) =>
        a.attributes.percent < b.attributes.percent ? 1 : -1
      );
      placeCard = (
        <div className="place compared">
          <h3>Sorted by relative representation</h3>
          <p>(times the national average)</p>
          <ListGroup>
            {groups.map((group) => {
              return (
                <ListGroupItem
                  className="ancestry group compared"
                  key={group.id}
                >
                  <p>
                    {group.attributes.ancestry_group.name}:{" "}
                    {group.attributes.relative_to_national}
                  </p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      );
    } else {
      placeCard = "Place not found";
    }
    return <div>{placeCard}</div>;
  } else {
    return null;
  }
};

export default PlaceComparison;
