import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";

const centralAuthState = {
  isAuthenticated: false,
  email: "",
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 300);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 300); 
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    centralAuthState.isAuthenticated === true ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

class App extends Component {
  render() {
    return (
      <div id="outterDiv">
      <BrowserRouter>
        <div  className="wrapper">
          <Switch>
            <Route exact path="/" render={() => (
              <Login auth={centralAuthState} />
            )} />
            <PrivateRoute path="/home" component={() => (
              <Home auth={centralAuthState} />
            )} />
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
