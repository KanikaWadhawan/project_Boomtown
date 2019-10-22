import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
// import ShareItemForm from '../../components/ShareItemForm';
// import ShareItemPreview from '../../components/ShareItemPreview';

import { Container, Grid } from "@material-ui/core";
import { ShareItemForm, ShareItemPreview } from "../../components";

const Share = ({ classes, tags }) => {
  return (
    <Container
      component="section"
      maxWidth={false}
      className={classes.sharePage}
    >
      <Grid container spacing={3}>
        <Grid className={classes.sharePreview} item xs={12} sm={6}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(Share);
