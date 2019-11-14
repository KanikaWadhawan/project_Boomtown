// stateful components
import React, { Component } from "react";
import Items from "./Items";

import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";
import FullScreenLoader from "../../components/FullScreenLoader";
import { ViewerContext } from "../../context/ViewerProvider";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => {
          return (
            <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
              {({ loading, error, data }) => {
                if (loading) return <FullScreenLoader />;
                if (error) return `${error}`;

                return <Items items={data.items} />;
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}
export default ItemsContainer;
