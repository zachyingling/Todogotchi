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
        todoToShow: "all",
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
                this.state.todoArr.push(newToDo);
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
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
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

    handleDeleteTodo = id => {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
    };


    removeAllTodosThatAreChecked = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    };
    // {JSON.stringify(this.state.todos)} changed this for map funciton

    renderTodos = () => {
        this.setState({ todoToShow: "all" });
        console.log("renderTodos was called");
    }

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
                                var j;
                                for (j = 0; j < toDoResults.length; j++) {
                                    if (this.state.todoDB.includes(toDoResults[j]._id)) {
                                        this.state.todoArr.push(toDoResults[j])
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                    }
                };
                console.log(this.state);
                this.renderTodos();
            })
            .catch(err => console.log(err));
    };


    componentDidMount() {
        // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.
        // get current happiness and energy stats from the database. 
        // this.loadStats();
        this.setCurrentUser();
        console.log(this.props);
    };

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.userID !== prevProps.userID) {
    //       this.fetchData(this.props.userID);
    //     }
    //   }


    render() {
        let todos = [];

        if (this.state.todoToShow === "all") {
            todos = this.state.todoArr;
        }
        else if (this.state.todoToShow === "active") {
            // todos = this.state.todos.filter(todo => !todo.complete);
            todos = this.state.todoArr;
        } else if (this.state.todoToShow === "complete") {
            // todos = this.state.todos.filter(todo => todo.complete);
            todos = this.state.todoArr;
        }


        return (
            <div>
                <div>
                    {/* minigame area */}
                    {/* <a href="https://benmulhollandpsl.github.io/todogotfree/"" */}

                    <button onClick={() => window.open("https://benmulhollandpsl.github.io/todogotfree/", 'targetWindow',
                        `status=no,
                                    menubar=no,
                                    width=550,
                                    height=550`)
                    }>MINI Game event</button>
                    {/* return false;"Popup link</a>" */}
                </div>


                <div>




                    <TodoForm onSubmit={this.addTodo} />
                    {todos.map(todo => (
                        <Todo
                            // {this.state.todos.map(todo => (
                            key={todo._id}
                            toggleComplete={() => this.toggleComplete(todo._id)}
                            onDelete={() => this.handleDeleteTodo(todo._id)}
                            todo={todo} />
                    ))}

                </div>
                <div>
                    todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>

                    <button onClick={() => this.updateTodoToShow("all")}>all</button>
                    <button onClick={() => this.updateTodoToShow("active")}>
                        active
        </button>

                    <button onClick={() => this.updateTodoToShow("complete")}>
                        complete
         </button>
                </div>
                {this.state.todos.some(todo => todo.complete) ? (
                    <div>
                        <button onClick={this.removeAllTodosThatAreChecked}>
                            remove all complete todos
          </button>
                    </div>
                ) : null}
                <div>
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
                </div>
            </div>
        );
    }
}

// creates unique key with id for each todo that we render
// don't need to pass into this because we can accessinner array id={todo.id}



// export default TodoList;