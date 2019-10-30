import React from "react";
import { Grid } from "@material-ui/core";
import { ItemCard } from "../../components";

const ItemsGrid = ({ items }) => (
  <Grid container spacing={3}>
    {items.length
      ? items.map(itemInfo => {
          return (
            <Grid key={itemInfo.id} item xs={12} sm={6} md={4}>
              <ItemCard key={itemInfo.id} itemInfo={itemInfo} />;
            </Grid>
          );
        })
      : `There is no item yet.`}
  </Grid>
);

export default ItemsGrid;
