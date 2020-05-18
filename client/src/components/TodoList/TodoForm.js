import React from 'react';
import shortid from 'shortid';

export default class TodoList extends React.Component {
    
    state = {
        text: ""

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
    
    render() {
        return( 
            <form onSubmit={this.handleSubmit}>
        <input
            name="text"
            value={this.state.text} 
            onChange={this.handleChange} 
            placeholder= "Todo List" 
        />
        <button onClick={this.handleSubmit}>add todo</button>
        </form>
    );
    }
}

