import React from "react";
import PetWindow from "../../PetWindow/PetWindow";
import TodoList from "../../TodoList/TodoList"; 
import API from "../../utils/API";
import { BrowserRouter as withRouter } from "react-router-dom";


// can import css from elsewhere, 

// this  is our homepage which displays pet after login screen
// showing animal chosen (when theres an option), its name, 
// a todo list that is (user made or could use a dropdownmenu with point values assigned such as work, fun, family etc, then allows user to type the specific task)
// showing health meter/happiness meter/hunger? of pet
// when happyness (or hunger?) level is sated it triggers a happiness event, (access to a minigame) which returns a change to the pet (increased happy, etc

class Home extends React.Component {
  state = {
    // using following state values to track/identify current user ID
    email: this.props.auth.email,
    currentUserId: ""
  };

  componentDidMount() {

    // determine current user via email address, pass current user ID to child components
    API.getUsers()
    .then(res => {
      // console.log(res.data[0]._id);
      var userResults = res.data
      var i;
      for (i=0; i < userResults.length; i++) {
        if (userResults[i].email === this.state.email) {
          this.setState({ currentUserId: userResults[i]._id})
          console.log(userResults[i]._id);
        }
      };
      console.log(this.state.currentUserId)
    })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <div className="container">
          <PetWindow email={this.state.email} currentUserId={this.state.currentUserId}/>
        </div>
        <div className="container">
           <TodoList />
        </div>
      </div>
    );
  }
}

export default Home;