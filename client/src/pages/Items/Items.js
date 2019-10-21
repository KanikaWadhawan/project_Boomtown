//Stateless Component
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Container } from "@material-ui/core";
import { ItemsGrid } from "../../components";

const Items = ({ classes, items }) => {
  return (
    <Container
      component="section"
      maxWidth={false}
      className={classes.pageItems}
    >
      <ItemsGrid items={items} />
    </Container>
  );
};

export default withStyles(styles)(Items);
