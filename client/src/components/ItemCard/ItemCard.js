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

const ItemCard = ({ classes, itemInfo }) => {
  const defaultItemInfo = {
    title: "Name your item",
    itemowner: {
      fullname: "User"
    },
    description: "Describe your item"
  };
  let info = itemInfo ? itemInfo : defaultItemInfo;

  return (
    <Grid item xs={12} sm={itemInfo ? 6 : 12} md={itemInfo ? 4 : 12}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.cardMediaItemsImg}
            // image={DodoImg}
            image={itemInfo.imageurl}
            title={info.title}
          />
        </CardActionArea>
        <CardHeader
          avatar={<Avatar alt={info.itemowner.fullname} src={ProfileImg} />}
          title={info.itemowner.fullname}
          subheader="October 20, 2019"
        />
        <CardContent>
          <Typography
            aria-label={info.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {info.title.length > 40
              ? `${info.title.slice(0, 40)}...`
              : info.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info.tags
              ? info.tags
                  .map(tag => tag.title)
                  .sort()
                  .join(", ")
              : "No tags are found"}
          </Typography>
          <Typography
            aria-label={info.description}
            variant="body1"
            color="textPrimary"
            component="p"
          >
            {info.description.length > 150
              ? `${info.description.slice(0, 150)}...`
              : info.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardMediaItemsBtn}>
          <Button variant="outlined">Borrow</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(ItemCard);
