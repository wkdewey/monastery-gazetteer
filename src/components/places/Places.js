import React, { Component } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardLink,
  CardText,
  CardColumns,
  Button,
} from "reactstrap";
import Like from "../Like";

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeLikes: [],
    };
  }

  handleLike = (id, event) => {
    const newLikes = [...this.state.placeLikes];
    newLikes[id] = newLikes[id] ? !newLikes[id] : true;
    this.setState({
      placeLikes: newLikes,
    });
  };

  render() {
    if (this.props.places.length > 0) {
      return (
        <CardColumns>
          {this.props.places.map((place) => {
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
                    <Button
                      onClick={(event) => {
                        this.handleLike(place.id, event);
                      }}
                    >
                      Like
                    </Button>
                    <Like liked={this.state.placeLikes[place.id] || false} />
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
  }
}

export default Places;
