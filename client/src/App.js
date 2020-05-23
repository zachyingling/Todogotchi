import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";

const centralAuthState = {
  isAuthenticated: false,
   authenticate(callback) {
      this.isAuthenticated = true;
      setTimeout(callback, 300);
   },
   signout(callback) {
      this.isAuthenticated = false;
      setTimeout(callback, 300); 
   }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (<Route {...rest} render={(props) => (
    centralAuthState.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
  )} />);
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Route path="/" component={() => <Login auth={centralAuthState} />} />
          <PrivateRoute path="/home" component={() => <Home auth={centralAuthState}  />} />
        </div>
      </Router>
    );
  }
}

export default App;
