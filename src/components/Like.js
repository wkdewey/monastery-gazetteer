import React, { Component } from "react";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }

  render() {
    const message = this.props.liked ? "Liked!" : "Not liked";
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
}

export default Like;
