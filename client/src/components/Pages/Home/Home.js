import React from "react";
import PetWindow from "../../PetWindow/PetWindow";
import TodoList from "../../TodoList/TodoList"; 
import ToDoForm from "../../TodoList/TodoForm";
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
    email: this.props.auth.email
  };



  render() {
    console.log(this.state);

    return (
      <div>
        <div className="container">
          <PetWindow email={this.state.email}/>
        </div>
        <div className="container">
           <TodoList email={this.state.email}/>
        </div>
      </div>
    );
  }
}

export default Home;