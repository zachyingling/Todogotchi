import React from "react";
// css imported from elsewhere not necissariyl from Login folder

// this is our 'first' page that shows a log in/register feature
class Login extends React.Component {
  state = {
    email: "",
    password: ""
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
  
  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return(
      <div className="container">
        <h1 className="text-center"></h1>
        <form className="form">
        <input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Email"
          />
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Password"
          />
          <input type="submit" onClick={this.handleFormSubmit} value="Submit" />
        </form>
      </div>
    );
  }
}

