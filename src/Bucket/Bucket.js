import React from 'react';
import Todo from '../Todo/Todo';

const Bucket = props => {
    // Renders todo list in a bucket.
    const renderTodoList = props.todoList.map(todo => {
        return (
            <Todo
                todoText={todo.todoText}
                key={todo.todoKey}
                editable={todo.todoEdit}
                edit={() => props.editTodo(todo.todoKey)}
                changeTodoText={event => props.changeTodoText(todo.todoKey, event)}
                delete={() => props.deleteTodo(todo.todoKey)} />
        )
    })

    // Adds '✓' button with input field if input value is not empty.
    let addTodoButton = null;
    if (props.todoInputvalue) {
        addTodoButton = (
            <button
                onClick={props.addTodo}>Add Todo</button>
        )
    }
    // Render Todo Button if input is not empty.
    return (
        <div>
            <p>{props.bucketName}</p>
            {renderTodoList}
            <input
                type="text"
                onChange={props.updateTodoInput}
                placeholder="Add a Todo"
                value={props.todoInputvalue} />
            {addTodoButton}
        </div>
    )
}

export default Bucket;