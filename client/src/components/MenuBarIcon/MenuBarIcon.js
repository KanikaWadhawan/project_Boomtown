import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography
} from "@material-ui/core";

import {
  MoreVert as MoreVertIcon,
  Fingerprint as FingerprintIcon,
  PowerSettingsNew as PowerSettingsNewIcon
} from "@material-ui/icons";

// import { graphql } from "react-apollo";
import { graphql, compose } from "react-apollo";
import { LOGOUT_MUTATION, VIEWER_QUERY } from "../../apollo/queries";

const SimpleMenu = ({ LOGOUT_MUTATION }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    console.log(1);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={NavLink} to={"/profile"} onClick={handleClose}>
          <ListItemIcon>
            <FingerprintIcon fontSize="default" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Your Profile
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            try {
              LOGOUT_MUTATION();
            } catch (e) {
              throw e;
            }
          }}
        >
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="default" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Sign Out
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: { refetchQueries },
    name: "LOGOUT_MUTATION"
  })
)(SimpleMenu);
