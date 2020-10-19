import React, { Component } from "react";
import { connect } from "react-redux";
import AncestryGroups from "../components/ancestry_groups/AncestryGroups";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import AncestryGroup from "../components/ancestry_groups/AncestryGroup.js";

class AncestryGroupsContainer extends Component {
  render() {
    const ancestry_groups = this.props.ancestry_groups;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}/:ancestryGroupId`}
            render={(routerProps) => {
              console.log("should redirect to Ancestry Group");
              return (
                <AncestryGroup
                  {...routerProps}
                  ancestry_groups={ancestry_groups}
                />
              );
            }}
          />
          {/* <Route path={`${this.props.match.path}/:ancestryGroupId`}>
            <AncestryGroup match={this.props.match} ancestry_groups={ancestry_groups} />
          </Route> */}
          <Route path={this.props.match.path}>
            <AncestryGroups ancestry_groups={ancestry_groups} />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ancestry_groups: state.ancestry_groups };
};

export default connect(mapStateToProps)(AncestryGroupsContainer);
