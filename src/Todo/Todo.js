import React from 'react';


const Todo = props => {
    const editTodo = event => {
        event.stopPropagation();
        props.edit();
    }

    let todo = null;
    if (props.editable) {
        todo = (
            <div>
                <input
                    type="text"
                    value={props.todoText}
                    onChange={props.changeTodoText} />
                <button onClick={editTodo}>Update</button>
            </div>
        )
    } else {
        todo = (
            <div>
                <p>{props.todoText}</p>
                <button onClick={editTodo}>✎</button>
                <button onClick={props.delete}>Delete</button>
            </div>
        )
    }
    return (
        <div>
            {todo}
        </div>
    )
}

export default Todo;