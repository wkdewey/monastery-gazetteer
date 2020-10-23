import React from "react";
import { Jumbotron } from "reactstrap";

const Home = () => {
  console.log("in Home component");
  return (
    <div>
      <Jumbotron className="App-header">
        <h1 className="display-3">Welcome to American Ancestries!</h1>
        <h3>Explore the cultural diversity of the United States</h3>
        <p className="lead">
          View different places and see how different ethnic origins are
          represented there, or view ancestry groups and where they are most
          strongly represented. If you have Census data you can also input new
          places with ancestry information.
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home;
