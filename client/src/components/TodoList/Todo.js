import React from 'react';
export default props => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          textDecoration: props.todo.complete ? "line-through" : ""
        }}
        onClick={props.toggleComplete}
      >
        {props.todo.listItem}
      </div>
      <button onClick={props.completeTodo}>✓</button>
      <button onClick={props.onDelete}>x</button>
    </div>
  );


//seperate component to render todo's<div onClick={props.toggleComplete}>{props.todo.text}</div>;