import React, { Component } from "react";
import Profile from "./Profile";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Query } from "react-apollo";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";

import { ViewerContext } from "../../context/ViewerProvider";
class ProfileContainer extends Component {
  render() {
    const { match } = this.props;

    return (
      <ViewerContext.Consumer>
        {({ viewer }) => {
          return (
            <Query
              query={ALL_USER_ITEMS_QUERY}
              variables={{
                id: match.params.id || viewer.id
              }}
              fetchPolicy="network-only"
            >
              {({ loading, error, data }) => {
                if (loading) return <FullScreenLoader />;
                if (error) return `Error: ${error}`;
                if (data) return <Profile userInfo={data.user} />;
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
