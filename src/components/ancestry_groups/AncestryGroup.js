import React from "react";
import { useParams } from "react-router-dom";

const AncestryGroup = (props) => {
  console.log(props);
  let { ancestryGroupId } = useParams();
  console.log(useParams());
  const ancestry_group = props.ancestry_groups[ancestryGroupId - 1];
  const ancestryGroupCard = ancestry_group ? (
    <div className="place">
      <h3>{ancestry_group.attributes.name}</h3>
      <p>Population: {ancestry_group.attributes.national_pop}</p>
    </div>
  ) : (
    "Place not found"
  );
  return <div>{ancestryGroupCard}</div>;
};

export default AncestryGroup;
