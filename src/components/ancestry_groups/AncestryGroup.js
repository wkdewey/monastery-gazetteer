import React from "react";
const AncestryGroup = (props) => {
  console.log(props);
  const ancestry_group =
    props.ancestry_groups[props.match.params.ancestryGroupId - 1];
  const ancestryGroupCard = ancestry_group ? (
    <div className="place">
      <h3>{ancestry_group.attributes.name}</h3>
      <p>Population: {ancestry_group.attributes.national_population}</p>
    </div>
  ) : (
    "Place not found"
  );
  return <div>{ancestryGroupCard}</div>;
};

export default AncestryGroup;
