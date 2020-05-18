import React from "react";
import TodoForm from "./TodoForm";
import Todo from './Todo';
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
        toggleAllComplete: true

    };
    
    addTodo = (todo) => {
        // this.state.todo.push(todo);//this mutates teh state
        // const newTodos = [todo, ...this.state.todos]; //... makes copy of array
        
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    };
    toggleComplete= (id) => {
        this.setState({
            todos: state.todos.map(todo => {
                // should update todos
                if (todo.id === id) {
                    return {
                        ...todo,
                        // id: todo.id,
                        // text: todo.text,
                        complete: !todo.complete //inverses the complete value
                    }
                } else{
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

    handleDeleteTodo = ud => {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !==id)
        }));
    };

    removeAllTodosThatAreChecked = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    };
    // {JSON.stringify(this.state.todos)} changed this for map funciton
    render() {
        let todos = [];

        if (this.state.todoToShow === "all") {
            todos = this.state.todos;
        } else if (this.state.todoToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todoToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete);
        }
        

        return (
        <div>
        <div>
            <TodoForm onSubmit= {this.addTodo} />
            {todos.map(todo => (
                <Todo
            // {this.state.todos.map(todo => (
                    key={todo.id} 
                    toggleComplete={() => this.toggleComplete(todo.id)}  
                    onDelete={() => this.handleDeleteTodo(todo.id)}
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



export default TodoList;