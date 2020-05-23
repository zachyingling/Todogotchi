import React from "react";
import PetWindow from "../../PetWindow/PetWindow";
import TodoList from "../../TodoList/TodoList"; 
import { BrowserRouter as withRouter } from "react-router-dom";
// import TodoForm from "../../TodoList/TodoForm"; //sint' currently working


// can import css from elsewhere, 

// this  is our homepage which displays pet after login screen
// showing animal chosen (when theres an option), its name, 
// a todo list that is (user made or could use a dropdownmenu with point values assigned such as work, fun, family etc, then allows user to type the specific task)
// showing health meter/happiness meter/hunger? of pet
// when happyness (or hunger?) level is sated it triggers a happiness event, (access to a minigame) which returns a change to the pet (increased happy, etc

class Home extends React.Component {
  state = {
    email: this.props.auth.email
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="container">
          <PetWindow />
        </div>
        <div className="container">
           <TodoList />
        </div>
      </div>
    );
  }
}

export default Home;