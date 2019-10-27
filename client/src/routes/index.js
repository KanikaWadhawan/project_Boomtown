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
            <Route exact path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <Fragment>
          <MenuBar />
          <Switch>
            <PrivateRoute exact path="/share" component={Share} />
            <PrivateRoute exact path="/items" component={Items} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Redirect from="*" to="/items" />
          </Switch>
        </Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
