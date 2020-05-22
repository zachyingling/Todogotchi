import React from "react";
import Axios from "axios";
import CreateAccount from "../../CreateAccount/CreateAccount";
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";
// css imported from elsewhere not necissariyl from Login folder
let redirectToReferrer;

// this is our 'first' page that shows a log in/register feature
class Login extends React.Component {
  redirectToReferrer = false;

  state = {
    email: "",
    password: "",
  };

  login = () => {
    // \/ Refference in App.js
    // auth.authenticate(() => {
    //   this.setState(() => ({ redirectToReferrer: true }))
    // });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };
  
  handlePassword = event => {
    event.preventDefault();
    if(this.state.password.length < 8){
      alert("Password needs to be 8 characters");
    } else {
      this.handleFormSubmit();
    }
  };

  handleFormSubmit = () => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    return Axios.post("/login/" + this.state.email + "/" + this.state.password).then(axiosResponse => {
      console.log(axiosResponse.data);
      if(axiosResponse.data === "not found"){
        alert("Account not found.");
      } else {
        this.setState({
          email: "",
          password: ""
        });
        redirectToReferrer = true;
        this.props.login();
      }
    }).catch(err => console.log(err));
  };

  render() {
    console.log(redirectToReferrer);
    console.log(this.props);

    if (redirectToReferrer === true) {
      return this.props.history.push("/home"); 
    } else {
      return(
        <div className="container">
          <h1 className="text-center">Please Login</h1>
          <form className="form">
            <label htmlFor="email">Email:</label>
            <input
              value={this.state.email}
              name="email"
              id="email"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Email"
            />
            <label htmlFor="password">Password(minimum 8 characters):</label>
            <input
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
              id="password"
              placeholder="Password"
              minLength="8"
              required
            />
            <input type="submit" onClick={this.handlePassword} value="Submit" />
          </form>
          <CreateAccount />
        </div>
      );
    }
  }
}

export default withRouter(Login);