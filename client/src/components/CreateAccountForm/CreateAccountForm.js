import React from "react";
import Axios from "axios";
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  login = () => {
    // \/ Refference in App.js
    return this.props.auth.auth.authenticate(() => (
      this.setState({ redirectToReferrer: true })
    ));
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    Axios.post("/api/users/create/" + this.state.email + "/" + this.state.password)
      .then(response => {
        if(response.data === "!valid"){
          alert("Email not valid.");
        } else if(response.data === "already") {
          alert("Account already made with that email.");
        } else {
          console.log(response);
          // React router the account info here \/
          this.setState({
            email: "",
            password: ""
          });
          this.login();
        }
      })
      .catch(err => console.log(err));
  };

  handlePassword = event => {
    event.preventDefault();
    if(this.state.password.length < 8){
      alert("Password needs to be 8 characters");
    } else {
      this.handleSubmit();
    }
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
      );
    }
  }
}

export default withRouter(CreateAccountForm);