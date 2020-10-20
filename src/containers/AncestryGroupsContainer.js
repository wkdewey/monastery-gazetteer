import React, { Component } from "react";
import { connect } from "react-redux";
import AncestryGroups from "../components/ancestry_groups/AncestryGroups";
import { Route, Switch } from "react-router-dom";
import AncestryGroup from "../components/ancestry_groups/AncestryGroup.js";

class AncestryGroupsContainer extends Component {
  render() {
    const ancestryGroups = this.props.ancestryGroups;
    return (
      <div>
        <Switch>
          <Route exact path={`${this.props.match.path}/:ancestryGroupId`}>
            <AncestryGroup ancestryGroups={ancestryGroups} />
          </Route>
          <Route path={this.props.match.path}>
            <AncestryGroups ancestryGroups={ancestryGroups} />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ancestryGroups: state.ancestryGroups };
};

export default connect(mapStateToProps)(AncestryGroupsContainer);
