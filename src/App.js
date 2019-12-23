import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from "./router";
import Routes2 from './router/router2'
import './assets/reset.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        // <Routes childProps={childProps} />
        <Routes2></Routes2>
    );
  }
}
export default withRouter(App);

