// stateful components
import React, { Component } from "react";
import Items from "./Items";

import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";
import FullScreenLoader from "../../components/FullScreenLoader";

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: 2 }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `Error: ${error}`;
          if (data) {
            // console.log(data);
            return <Items items={data.items} />;
          }
        }}
      </Query>
    );
  }
}
export default ItemsContainer;
