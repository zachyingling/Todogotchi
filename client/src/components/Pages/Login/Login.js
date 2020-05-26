import React from "react";
import Axios from "axios";
import CreateAccount from "../../CreateAccount/CreateAccount";
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";
// css imported from elsewhere not necissariyl from Login folder

// this is our 'first' page that shows a log in/register feature
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  login = () => {
    // \/ Refference in App.js
    this.props.auth.email = this.state.email;
    return this.props.auth.authenticate(() => (
      this.setState({ redirectToReferrer: true })
    ));
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
      return alert("Password needs to be 8 characters");
    } else {
      return this.handleFormSubmit();
    }
  };

  handleFormSubmit = () => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    return Axios.post("/api/users/login/" + this.state.email + "/" + this.state.password).then(axiosResponse => {
      console.log(axiosResponse);
      if(axiosResponse.data === "Email not found"){
        alert("Account info not valid.");
      } else if(axiosResponse.data === "!password"){
        alert("Incorrect password");
      } else {
        return this.login();
      }
    }).catch(err => console.log(err));
  };

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      this.props.history.push("/home");
      return (
        <Redirect to="/home" />
      );
    } else {
      return (
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
          <CreateAccount auth={this.props.auth} />
        </div>
      );
    }
  }
}

export default withRouter(Login);