import React from "react";
import styles from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircle from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core";
import logo from "../../images/boomtown.svg";
import Fab from "@material-ui/core/Fab";
import MenuBarIcon from "./../MenuBarIcon";
import { NavLink } from "react-router-dom";

const MenuBar = ({ classes }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          component={NavLink}
          to={"/items"}
        >
          <img height="48px" width="48px" src={logo}></img>
        </IconButton>
        <div className={classes.menuBar}>
          <Fab
            variant="variant"
            color="primary"
            className={classes.fabbar}
            component={NavLink}
            to={"/share"}
          >
            <AddCircle className={classes.extentedIcon} />
            Share Something
          </Fab>

          <MenuBarIcon />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(MenuBar);
