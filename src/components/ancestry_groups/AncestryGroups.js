import React from "react";
import { Link } from "react-router-dom";

const AncestryGroups = (props) =>
  props.ancestry_groups.map((ancestry_group) => {
    console.log(props.ancestry_groups);
    return (
      <div className="ancestry_group" key={ancestry_group.id}>
        <h3>
          <Link
            key={ancestry_group.id}
            to={`/ancestry_groups/${ancestry_group.id}`}
          >
            {ancestry_group.attributes.name}
          </Link>
        </h3>
        <p>
          Percent of US Population: {ancestry_group.attributes.national_percent}
        </p>
      </div>
    );
  });

export default AncestryGroups;
