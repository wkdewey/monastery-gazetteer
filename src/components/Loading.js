import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div>
      <h3>Loading, please wait.</h3>
      <Spinner />
    </div>
  );
};

export default Loading;
