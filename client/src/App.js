import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (
    this.state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
  )} />
};

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.authenticated = this.authenticated.bind(this);
    this.signout = this.signout.bind(this);
  }

  authenticated(){
    this.setState({ isAuthenticated: true });
  }

  signout(){
    this.setState({ isAuthenticated: false });
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={() => <Login auth={this.state.isAuthenticated} login={this.authenticated} logout={this.signout} />} />
            <PrivateRoute exact path="/home" component={() => <Home auth={this.state.isAuthenticated} login={this.authenticated} logout={this.signout} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
