import React from "react";
import TodoForm from "./TodoForm";
import Todo from './Todo';
import API from '../utils/API';

// import Axios from "axios";
// import CreateAccount from "../../CreateAccount/CreateAccount";

// todo list 
// a) Add Todo
// b) display Todo
// c) cross off Todo
// d) show number of active Todo
// e) filter all/active/done
// f) delete Todo
// g) delete all completed
//     - only show if at least one item is checked
// h) button to toggle all on/off
// i) value of each checkbox that is sent on
// j) suggested fields, or drop down items from users made TodoList


//    Input Form   

// Class 

export default class TodoList extends React.Component {

    state = {
        todos: [],
        todoToShow: "active",
        toggleAllComplete: true,
        currentUserId: "",
        email: this.props.email,
        currentPetId: "",
        todoDB: [],
        todoArr: [],
        bwabwabwa: false
    };


    addTodo = (todo) => {
        // this.state.todo.push(todo);//this mutates teh state
        // const newTodos = [todo, ...this.state.todos]; //... makes copy of array



        console.log(todo);
        var newToDo;
        var myCurrentUser = this.state.currentUserId;

        API.saveTodo({
            listItem: todo.text,
            completionStatus: false,
            lastUpdated: new Date(Date.now())
        })
            .then(response => {
                console.log(response.data);
                newToDo = response.data;
                console.log("my currentUserId: " + myCurrentUser);
                var todoHolder = this.state.todoArr;
                todoHolder.push(newToDo);
                this.setState({ todoArr: todoHolder });
                console.log(this.state);
                API.updateUser(myCurrentUser,
                    {
                        $push:
                        {
                            userToDos: newToDo
                        }
                    }
                )
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });

    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                // should update todos
                if (todo.id === id) {
                    return {
                        ...todo,
                        // id: todo.id,
                        // text: todo.text,
                        complete: !todo.complete //inverses the complete value
                    }
                } else {
                    return todo;
                    //just return and dont change values
                }
            })
        })
    }

    updateTodoToShow = s => {
        this.setState({
            todoToShow: s
        });
    };

    completeTodo = id => {
        var completedTodos = [];
        completedTodos = this.state.todoArr.filter(todo => todo.completionStatus === true);
        var i;
        var nope = false;
        for (i = 0; i < completedTodos.length; i++) {
            if (id === completedTodos[i]._id) {
                nope = true;
            }
        }
        if (nope) {

            console.log("todo is already complete")
        } else {
            API.updateTodo(id,
                {
                    completionStatus: true
                }
            )
                .then(response => {
                    console.log(response);
                    this.setCurrentUser();

                    API.getPetStats(this.state.currentPetId)
                        .then(res => {
                            console.log(res);
                            if (res.data.energyLevel === 11) {
                                var newEnergy = res.data.energyLevel + 1;
                            } else if (res.data.energyLevel === 12) {
                                var newEnergy = res.data.energyLevel
                            } else {  var newEnergy = res.data.energyLevel + 2;}
                            console.log("Energy level increased to " + newEnergy);

                            API.saveEnergy(this.state.currentPetId,
                                {
                                    energyLevel: newEnergy
                                }
                            )
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err);
                                })


                        }
                        )
                        .catch(err => console.log(err));




                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    handleDeleteTodo = id => {
        // this.setState(state => ({
        //     todos: state.todos.filter(todo => todo.id !== id)
        // }));

        API.deleteTodo(id)
            .then(res => {
                console.log(res);
                this.setState(state => ({
                    todoArr: state.todoArr.filter(todo => todo._id !== id)
                }));
                console.log(this.state.todoArr);
            })


    };


    removeAllTodosThatAreChecked = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    };
    // {JSON.stringify(this.state.todos)} changed this for map funciton


    setCurrentUser = () => {
        API.getUsers()
            .then(res => {
                // console.log(res.data[0]._id);
                var userResults = res.data
                console.log(userResults);
                var i;
                for (i = 0; i < userResults.length; i++) {
                    if (userResults[i].email === this.state.email) {
                        this.setState({ currentUserId: userResults[i]._id, currentPetId: userResults[i].userPets[0], todoDB: userResults[i].userToDos })
                        console.log(userResults[i]._id);

                        API.getTodos()
                            .then(res => {
                                console.log(res);
                                var toDoResults = res.data;
                                var todoHolder = [];
                                var j;
                                for (j = 0; j < toDoResults.length; j++) {
                                    if (this.state.todoDB.includes(toDoResults[j]._id)) {
                                        todoHolder.push(toDoResults[j])
                                    }
                                };
                                this.setState({ todoArr: todoHolder });
                            })
                            .catch(err => console.log(err));
                    }
                };
                console.log(this.state);
            })
            .catch(err => console.log(err));
    };


    componentDidMount() {
        // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.
        // get current happiness and energy stats from the database. 
        // this.loadStats();
        this.setCurrentUser();

    };

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.userID !== prevProps.userID) {
    //       this.fetchData(this.props.userID);
    //     }
    //   }


    render() {
        let todos = [];

        // if (this.state.todoToShow === "all") {
        //     todos = this.state.todoArr;
        // }
       if (this.state.todoToShow === "active") {
            // todos = this.state.todos.filter(todo => !todo.complete)

            todos = this.state.todoArr.filter(todo => todo.completionStatus !== true)


        } else if (this.state.todoToShow === "complete") {
            todos = this.state.todoArr.filter(todo => todo.completionStatus === true)
        }


        return (
            <div className="container shadow rounded p-2">
                <div className="row">
                    {/* <div className="col">
                <div>
               

                    <button onClick={() => window.open("https://benmulhollandpsl.github.io/todogotfree/", 'targetWindow',
                        `status=no,
                                    menubar=no,
                                    width=550,
                                    height=550`)
                    }>MINI Game event</button>
                    return false;"Popup link</a>"
                </div>
                </div> */}
                <div className="col">
                <TodoForm onSubmit={this.addTodo} />
                </div>
                </div>
                <div className="row " style={{"margin-top": "3vh", "margin-bottom": "3vh"}}>




                    
                    {todos.map(todo => (
                        <div className="col">
                        <Todo
                            // {this.state.todos.map(todo => (
                            key={todo._id}
                            toggleComplete={() => this.toggleComplete(todo._id)}
                            completeTodo={() => this.completeTodo(todo._id)}
                            onDelete={() => this.handleDeleteTodo(todo._id)}
                            todo={todo} />
                        </div>
                    ))}

                </div>

                {/* need to decide how many to show per row per column for todo list */}
                

                <div className="row">
                    <div className="col">
                <div>
                    todos left: {this.state.todoArr.filter(todo => !todo.completionStatus).length}
                </div>
                </div>
                    <div className="col">
                        <div>
                            {/* <button onClick={() => this.updateTodoToShow("all")}>all</button> */}
                            <button onClick={() => this.updateTodoToShow("active")}>active</button>
                            <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
                        </div>
                    </div>
                </div>

                {this.state.todos.some(todo => todo.complete) ? (
                    <div>
                        <button onClick={this.removeAllTodosThatAreChecked}>
                            remove all complete todos
            </button>
                    </div>
                ) : null}
                {/* <div>
                    <button
                        onClick={() =>
                            this.setState(state => ({
                                todos: state.todos.map(todo => ({
                                    ...todo,
                                    complete: state.toggleAllComplete
                                })),
                                toggleAllComplete: !state.toggleAllComplete
                            }))
                        }
                    >
                        toggle all complete: {`${this.state.toggleAllComplete}`}
                    </button>
                </div> */}
            </div>
        );
    }
}

// creates unique key with id for each todo that we render
// don't need to pass into this because we can accessinner array id={todo.id}



// export default TodoList;