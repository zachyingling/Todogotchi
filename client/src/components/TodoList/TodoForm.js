import React from 'react';


export default class TodoList extends React.Component {
    
    state = {
        text: ""

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
        
    
    render() {
        return( 
        <input
            name="text"
            value={this.state.text} 
            onChange={this.handleChange} 
            placeholder= "Todo List" 
        />
    );
    }
}

//work in progress 5/16/22 4:03PM -Ben