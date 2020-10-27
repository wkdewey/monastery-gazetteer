import React from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Table } from "reactstrap";

const AncestryGroup = (props) => {
  let { ancestryGroupId } = useParams();
  if (props.ancestryGroups.length > 0) {
    const ancestryGroup = props.ancestryGroups.find(
      (group) => group.id === ancestryGroupId
    );
    const places = ancestryGroup.attributes.place_ancestry_groups;
    places.sort((a, b) =>
      a.attributes.percent < b.attributes.percent ? 1 : -1
    );
    const ancestryGroupCard = ancestryGroup ? (
      <div className="ancestry group">
        <Card>
          <CardBody>
            <CardTitle>
              <h3>{ancestryGroup.attributes.name}</h3>
            </CardTitle>
            <CardText>
              Population in the United States:{" "}
              {ancestryGroup.attributes.national_pop.toLocaleString()}
            </CardText>
          </CardBody>
        </Card>
        <Table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Percent</th>
              <th>Relative to overall US population</th>
            </tr>
          </thead>
          {places.map((place) => {
            return (
              <tr className="place" key={place.id}>
                <td>{place.attributes.place.name}</td>
                <td>{place.attributes.percent}%</td>
                <td>{place.attributes.relative_to_national}x</td>
              </tr>
            );
          })}
        </Table>
      </div>
    ) : (
      "Place not found"
    );
    return <div>{ancestryGroupCard}</div>;
  } else return <Loading />;
};

export default AncestryGroup;
