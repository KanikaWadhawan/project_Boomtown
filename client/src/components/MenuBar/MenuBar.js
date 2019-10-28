import React, { Component } from "react";
import styles from "./styles";
import { NavLink, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Fab,
  IconButton,
  Icon,
  Slide
} from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import MenuBarIcon from "./../MenuBarIcon";
import logo from "../../images/boomtown.svg";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeShareBtn: true
    };
  }
  componentDidMount() {
    const { location } = this.props;
    if (location.pathname === "/share" && this.state.activeShareBtn === true) {
      this.changeStateShare();
    } else if (
      location.pathname !== "/share" &&
      this.state.activeShareBtn === false
    ) {
      this.changeStateShare();
    }
  }
  componentDidUpdate() {
    const { location } = this.props;
    if (location.pathname === "/share" && this.state.activeShareBtn === true) {
      this.changeStateShare();
    } else if (
      location.pathname !== "/share" &&
      this.state.activeShareBtn === false
    ) {
      this.changeStateShare();
    }
  }

  changeStateShare = () => {
    this.setState({ activeShareBtn: !this.state.activeShareBtn });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            component={NavLink}
            to={"/items"}
          >
            <Icon className={classes.menuButton}>
              <img className={classes.imgLogo} src={logo} alt="Boomtown" />
            </Icon>
          </IconButton>

          <div className={classes.menuBar}>
            <Slide
              direction="left"
              in={this.state.activeShareBtn}
              unmountOnExit
            >
              <Fab
                className={classes.btnShare}
                variant="extended"
                color="primary"
                aria-label="share"
                component={NavLink}
                to={"/share"}
              >
                <AddCircleIcon className={classes.extendedIcon} />
                Share something
              </Fab>
            </Slide>
            <MenuBarIcon />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(MenuBar));
