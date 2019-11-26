import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Gravatar from "react-gravatar";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
    <Card className={classes.card}>
      <CardActionArea>
        {info.itemowner ? (
          <CardMedia
            className={classes.cardMediaItemsImg}
            image={info.imageurl}
            title={info.title}
            component={Link}
            to={`/profile/${info.itemowner.id}`}
          />
        ) : (
          <CardMedia
            className={classes.cardMediaItemsImg}
            image={info.imageurl}
            title={info.title}
          />
        )}
      </CardActionArea>

      <CardHeader
        component={Link}
        to={`/profile/${info.itemowner.id}`}
        avatar={
          <Gravatar
            email={info.itemowner.email}
            size={40}
            className={classes.avatar}
          />
        }
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
  );
};

ItemCard.propTypes = {
  itemInfo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageurl: PropTypes.string,
    tags: PropTypes.array,
    itemowner: PropTypes.object,
    borrower: PropTypes.object,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }),

  viewer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    imageurl: PropTypes.string,
    bio: PropTypes.string
  })
};
export default withStyles(styles)(ItemCard);
