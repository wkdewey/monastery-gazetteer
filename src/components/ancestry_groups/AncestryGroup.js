import React from "react";
import { useParams } from "react-router-dom";

const AncestryGroup = (props) => {
  console.log(props);
  let { ancestryGroupId } = useParams();
  console.log(useParams());
  const ancestry_group = props.ancestry_groups[ancestryGroupId - 1];
  const places = ancestry_group.attributes.place_ancestry_groups;
  places.sort((a, b) => (a.attributes.percent < b.attributes.percent ? 1 : -1));
  const ancestryGroupCard = ancestry_group ? (
    <div className="ancestry group">
      <h3>{ancestry_group.attributes.name}</h3>
      <p>
        Population in the United States:{" "}
        {ancestry_group.attributes.national_pop}
      </p>
      {places.map((place) => {
        return (
          <div className="place" key={place.id}>
            <p>
              {place.attributes.place.name}: {place.attributes.percent}%
            </p>
          </div>
        );
      })}
    </div>
  ) : (
    "Place not found"
  );
  return <div>{ancestryGroupCard}</div>;
};

export default AncestryGroup;
