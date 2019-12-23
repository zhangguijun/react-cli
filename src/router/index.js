import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncHome = asyncComponent(() => import("../pages/Home"));
const AsyncNotFound = asyncComponent(() => import("../pages/NotFound"));

export default ({ childProps }) =>
  <Switch>
    <Route
      path="/"
      exact
      component={AsyncHome}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>;
