import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { ItemsGrid } from "../../components";
import styles from "./styles";
import Gravatar from "react-gravatar";
import PropTypes from "prop-types";

const Profile = ({ classes, userInfo }) => {
  return (
    <Container
      component="section"
      maxWidth={false}
      className={classes.pageProfile}
    >
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.gridProfile}>
            <CardHeader
              className={classes.cardProfileContent}
              avatar={
                <Gravatar
                  email={userInfo.email}
                  size={40}
                  className={classes.avatar}
                />
              }
              title={
                <Typography variant="h4" component="h2" color="textSecondary">
                  {userInfo.fullname}
                </Typography>
              }
            />
            <CardContent className={classes.cardProfileContent}>
              <Typography variant="h6" component="p">
                {userInfo.items ? userInfo.items.length : 0} Items shared{" "}
                {userInfo.borrowed ? userInfo.borrowed.length : 0} Items
                borrowed
              </Typography>
              <Typography component="p">
                {userInfo.bio ? userInfo.bio : `"No bio provided."`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {userInfo.items ? (
        <ProfileItems
          classes={classes}
          title={"Shared Items"}
          items={userInfo.items}
        />
      ) : (
        ``
      )}
      {userInfo.borrowed ? (
        <ProfileItems
          classes={classes}
          title={"Borrowed Items"}
          items={userInfo.borrowed}
        />
      ) : (
        ``
      )}
    </Container>
  );
};

Profile.propTypes = {
  fullname: PropTypes.string,
  bio: PropTypes.string,
  email: PropTypes.string,
  userimageurl: PropTypes.string,

  items: PropTypes.arrayOf(PropTypes.object),
  borrowed: PropTypes.arrayOf(PropTypes.object)
};
const ProfileItems = ({ classes, items, title }) => (
  <Fragment>
    <Grid container>
      <Typography
        className={classes.gridProfileHeader}
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
      >
        {title}
      </Typography>
    </Grid>
    <ItemsGrid items={items} />
  </Fragment>
);

export default withStyles(styles)(Profile);
