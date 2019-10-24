import React from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const FullScreenLoader = ({ classes }) => {
  return (
    <React.Fragment>
      <div className={classes.loaderContainer}>
        <div>
          <CircularProgress className={classes.progress} />
          <div>"For it is giving that we receive."</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(FullScreenLoader);
