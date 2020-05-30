import React from 'react';
import shortid from 'shortid';
import API from '../utils/API';
import "./TodoList.css";
export default class TodoList extends React.Component {
    state = {
        text: "",
        // currentUserId: "",
        // email: this.props.email,
        // currentPetId: ""
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit({
                id: shortid.generate(),
                text: this.state.text,
                complete: false
            });
            this.setState({
                text: ""
            }
            );
            //submit the form create a new todo and pass it to new todo
        //create a function to make a new todo
        };
    //     handleTodoSave = () => {
    //     var newToDo;
    //     var myCurrentUser = this.state.currentUserId;
    //     console.log(this.state);
    //     API.saveTodo({
    //         listItem: this.state.text,
    //         completionStatus: false,
    //         lastUpdated: new Date(Date.now())
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             newToDo = response.data;
    //             console.log("my currentUserId: " + myCurrentUser);
    //             API.updateUser(myCurrentUser,
    //                 {
    //                     $push:
    //                     {
    //                         userToDos: newToDo
    //                     }
    //                 }
    //             )
    //                 .then(response => {
    //                     console.log(response);
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };
    // setCurrentUser = () => {
    //     API.getUsers()
    //         .then(res => {
    //             // console.log(res.data[0]._id);
    //             var userResults = res.data
    //             console.log(userResults);
    //             var i;
    //             for (i = 0; i < userResults.length; i++) {
    //                 if (userResults[i].email === this.state.email) {
    //                     this.setState({ currentUserId: userResults[i]._id, currentPetId: userResults[i].userPets[0] })
    //                     console.log(userResults[i]._id);
    //                 }
    //             };
    //             console.log(this.state.currentUserId)
    //         })
    //         .catch(err => console.log(err));
    // };
    // componentDidMount() {
    //     // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.
    //     // get current happiness and energy stats from the database. 
    //     // this.loadStats();
    //     this.setCurrentUser();
    //     console.log(this.state);
    // };
    render() {
        return( 
            <form onSubmit={this.handleSubmit}>
        <input
            name="text"
            value={this.state.text} 
            onChange={this.handleChange} 
            placeholder= "Todo List" 
        />
        <button type="button" class="btn btn-info todoaddsbutton" onClick={this.handleSubmit}>add ToDo</button>
        </form>
    );
    }
}
// Message Ben Mulholland, Vince Casmirri, Zach Yingling