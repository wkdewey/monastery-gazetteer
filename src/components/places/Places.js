import React from "react";
import Loading from "../Loading";
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
          console.log(place);
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
                  <CardText>
                    Population: {place.attributes.population.toLocaleString()}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </CardColumns>
    );
  } else {
    return <Loading />;
  }
};

export default Places;
