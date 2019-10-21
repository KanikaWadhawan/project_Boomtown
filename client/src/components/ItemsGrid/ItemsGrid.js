import React from "react";
import { Grid } from "@material-ui/core";
import { ItemCard } from "../../components";

const ItemsGrid = ({ items }) => (
  <Grid container spacing={3}>
    {items.length
      ? items.map(itemInfo => {
          return <ItemCard key={itemInfo.id} itemInfo={itemInfo} />;
        })
      : `There is no item yet.`}
  </Grid>
);

export default ItemsGrid;
