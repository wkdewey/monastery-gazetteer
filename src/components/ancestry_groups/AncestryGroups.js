import React from "react";
import { Link } from "react-router-dom";

const AncestryGroups = (props) => {
  if (props.ancestryGroups.length > 0) {
    return props.ancestryGroups.map((ancestryGroup) => {
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
            Percent of US Population:{" "}
            {ancestryGroup.attributes.national_percent}
          </p>
        </div>
      );
    });
  } else {
    return (
      <div>
        <h3>Loading, please wait.</h3>
      </div>
    );
  }
};

export default AncestryGroups;
