import React from 'react';
import "./TodoList.css";
export default props => (
    <div style={{ display: "flex", justifyContent: "right" }}>
      <div
        style={{
          textDecoration: props.todo.complete ? "line-through" : ""
        }}
        onClick={props.toggleComplete}
      >
        {props.todo.listItem}
      </div>
      <button class="checkmarkandx" onClick={props.completeTodo}>✓</button>
      <button class="checkmarkandx" onClick={props.onDelete}>x</button>
    </div>
  );


//seperate component to render todo's<div onClick={props.toggleComplete}>{props.todo.text}</div>;