import React from "react";
import { Link } from "react-router-dom";

const AncestryGroups = (props) =>
  props.ancestryGroups.map((ancestryGroup) => {
    return (
      <div className="ancestry_group" key={ancestryGroup.id}>
        <h3>
          <Link
            key={ancestryGroup.id}
            to={`/ancestry_groups/${ancestryGroup.id}`}
          >
            {ancestryGroup.attributes.name}
          </Link>
        </h3>
        <p>
          Percent of US Population: {ancestryGroup.attributes.national_percent}
        </p>
      </div>
    );
  });

export default AncestryGroups;
