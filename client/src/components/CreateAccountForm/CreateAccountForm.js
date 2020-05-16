import React from "react";
import Axios from "axios";

class CreateAccountForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    Axios.post("/create/" + this.state.email + "/" + this.state.password)
      .then(response => {
        console.log(response);
        // Might not need this \/
        // this.setState({
        //   email: "",
        //   password: ""
        // });
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
    return (
      <form className="form">
        <label for="email">Email:</label>
        <input
          value={this.state.email}
          name="email"
          id="email"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Email"
        />
        <label for="password">Password(minimum 8 characters):</label>
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

export default CreateAccountForm;