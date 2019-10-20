import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuBar } from "../components";
import { Home, Items, Share, Profile } from "../pages";

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <MenuBar />
    <Switch>
      <Route exact path="/welcome" component={Home} />
      <Route path="/share" component={Share} />
      <Route path="/items" component={Items} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" component={Profile} />
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
