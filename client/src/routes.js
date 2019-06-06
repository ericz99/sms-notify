import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import App from "./App";
import Login from "./views/Login";
import Register from "./views/Register";
import Settings from "./views/Settings";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import PrivateRoute from "./components/Common/PrivateRoute";

import { setCurrentUser, logoutUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

const UNAUTHORIZED = 401;

// if user has token in localstorage already => just auth them
if (localStorage.jwtToken) {
  // set auth
  setAuthToken(localStorage.jwtToken);
  // get the decoded value from the token
  const decoded = jwtDecode(localStorage.jwtToken);
  // set current user to authentciated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // redirect user back to login
    window.location.href = "/login";
  }
}

// this will intercept between request / reponses and see if anything happens if user token expired!
axios.interceptors.response.use(
  res => res,
  err => {
    const { status } = err.response;
    if (status === UNAUTHORIZED) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(err);
  }
);

const routes = ({ match, history, location }) => {
  return (
    <App>
      <Switch>
        {location.pathname === "/" && <Redirect to="/login" />}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </App>
  );
};

export default withRouter(routes);
