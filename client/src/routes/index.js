import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuBar } from "../components";
import { Home, Items, Share, Profile } from "../pages";
import { ViewerContext } from "../context/ViewerProvider";
import PrivateRoute from "../components/PrivateRoute";

export default () => (
  <ViewerContext.Consumer>
    {({ viewer }) => {
      if (!viewer) {
        return (
          <Switch>
            <Route path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <Fragment>
          {console.log(viewer)}

          <MenuBar />
          <Switch>
            {/* <Route exact path="/welcome" component={Home} />
            <Route path="/share" component={Share} />
            <Route path="/items" component={Items} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/profile" component={Profile} /> */}
            <PrivateRoute exact path="/share" component={Share} />
            <PrivateRoute exact path="/items" component={Items} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Redirect from="*" to="/items" />
            {/**
             * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
             *
             * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
             *
             * Later, we'll add logic to send users to one set of routes if they're logged in,
             * or only view the /welcome page if they are not.
             *
             */}
          </Switch>
        </Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
