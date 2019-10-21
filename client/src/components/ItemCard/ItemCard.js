import React from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import DodoImg from "../../images/dodo.jpg";
import ProfileImg from "../../images/doggy.png";

const ItemCard = ({ classes, itemInfo }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.cardMediaItemsImg}
          image={DodoImg}
          title={itemInfo.title}
        />
      </CardActionArea>
      <CardHeader
        avatar={<Avatar alt={itemInfo.itemowner.fullname} src={ProfileImg} />}
        title={itemInfo.itemowner.fullname}
        subheader="October 20, 2019"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {itemInfo.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {itemInfo.tags
            ? itemInfo.tags
                .map(tag => tag.title)
                .sort()
                .join(", ")
            : "No tags are found"}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {itemInfo.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardMediaItemsBtn}>
        <Button variant="outlined">Borrow</Button>
      </CardActions>
    </Card>
  </Grid>
);

export default withStyles(styles)(ItemCard);
