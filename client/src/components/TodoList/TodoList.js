import React from "react";
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
        todos: []

    };
    
    addTodo = (todo) => {
        // this.state.todo.push(todo);//this mutates teh state
        // const newTodos = [todo, ...this.state.todos]; //... makes copy of array
        
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    };
    
    render() {
        return (
        <div>
            <TodoForm onSubmit= {this.addTodo} />
            </div>
        );    
}
}


// export default TodoList;