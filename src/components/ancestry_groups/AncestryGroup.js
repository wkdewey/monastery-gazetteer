import React from "react";
import { useParams } from "react-router-dom";

const AncestryGroup = (props) => {
  console.log(props);
  let { ancestryGroupId } = useParams();
  console.log(useParams());
  const ancestryGroup = props.ancestryGroups[ancestryGroupId - 1];
  const places = ancestryGroup.attributes.placeAncestryGroups;
  places.sort((a, b) => (a.attributes.percent < b.attributes.percent ? 1 : -1));
  const ancestryGroupCard = ancestryGroup ? (
    <div className="ancestry group">
      <h3>{ancestryGroup.attributes.name}</h3>
      <p>
        Population in the United States: {ancestryGroup.attributes.nationalPop}
      </p>
      {places.map((place) => {
        return (
          <div className="place" key={place.id}>
            <p>
              {place.attributes.place.name}: {place.attributes.percent}%,{" "}
              {place.attributes.relativeToNational}x national average
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
