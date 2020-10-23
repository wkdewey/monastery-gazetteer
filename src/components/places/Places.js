import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardLink,
  CardText,
  CardColumns,
} from "reactstrap";

const Places = (props) => {
  if (props.places.length > 0) {
    return (
      <CardColumns>
        {props.places.map((place) => {
          return (
            <div className="place" key={place.id}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h3>
                      <CardLink>
                        <Link key={place.id} to={`/places/${place.id}`}>
                          {place.attributes.name}
                        </Link>
                      </CardLink>
                    </h3>
                  </CardTitle>
                  <CardText>Population: {place.attributes.population}</CardText>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </CardColumns>
    );
  } else {
    return (
      <div>
        <h3>Loading, please wait.</h3>
      </div>
    );
  }
};

export default Places;
