import React, { Component } from 'react';
import { v4 as uuidV4 } from 'uuid';

import Bucket from './Bucket/Bucket';

class App extends Component {

  state = {
    bucketList: [],
    bucketName: '',
    addInputBucket: false,
  };

  // Handles when user clicks on button to add a bucket.
  openInputBucketHandler = () => {
    // Setting to true so as the inpput field gets rendered.
    this.setState({ addInputBucket: true });
  }

  // Handles when user closes add a bucket input.
  closeBucketInputHandler = () => {
    // Clearing the bucket name if user closes the input field.
    this.setState({
      addInputBucket: false,
      bucketName: ''
    });
  }

  // Handles when user update bucket input value.
  changeBucketInputHandler = event => {
    // Updating the state with bucket name.s
    this.setState({ bucketName: event.target.value });
  }

  // Adds a bucket into the list.
  addBucketHandler = () => {
    // Creating a new bucket
    const bucket = {
      bucketName: this.state.bucketName,
      todoList: [],
      todoInput: '',
      bucketKey: uuidV4()
    };
    // Creating copy of the original array.
    const bucketArr = [...this.state.bucketList];
    // Pushing new bucket to the created arr.
    bucketArr.push(bucket);

    // Updating the state with new bucket.
    this.setState({
      bucketList: bucketArr,
      bucketName: '' // Setting the bucket name to empty again.
    });
  }

  // Returns index of current bucket.
  findBucketIndex = key => {
    return this.state.bucketList.findIndex(bucket => bucket.bucketKey === key);
  }

  // Get current bucket.
  fetchBucketHandler = key => {
    // Fetcing the index of current bucket.
    const bucketIndex = this.findBucketIndex(key);
    return [this.state.bucketList[bucketIndex], bucketIndex];
  }

  // return updated bucket list array.
  generateBucketArray = (bucket, index) => {
    return this.state.bucketList.slice(0, index)
      .concat(bucket)
      .concat(this.state.bucketList.slice(index + 1));
  }

  // handles state bucket list updation
  updatedBucketStateHandler = (bucket, index) => {
    // Creating an array having updated bucket.
    const bucketListUpdated = this.generateBucketArray(bucket, index);
    // Storing the input back to the state.
    this.setState({
      bucketList: bucketListUpdated
    })
  }

  // Update Todo input handler (Getting value from todo input field in bucket).
  updateTodoInputHandler = (key, event) => {
    const [bucket, index] = this.fetchBucketHandler(key);
    // Updating the todoName to value present in input field.
    bucket.todoInput = event.target.value;
    // Updates state with new bucket.
    this.updatedBucketStateHandler(bucket, index);
  }

  // Handles adding a Todo in bucket
  addTodoHandler = key => {
    const [bucket, index] = this.fetchBucketHandler(key);
    // Fetch the value from the todo input.
    const todo = {
      todoText: bucket.todoInput,
      todoKey: uuidV4(),
      todoEdit: false
    }
    // Insert the todo to bucket's todo list.
    bucket.todoList.push(todo);
    bucket.todoInput = '';
    // Updates state with new bucket.
    this.updatedBucketStateHandler(bucket, index);
  }

  // Fetches bucket, its index and todo index.
  fetchTodoInfoHandler = (bucketKey, todoKey) => {
    // Fetching bucket and its index.
    const [bucket, index] = this.fetchBucketHandler(bucketKey);
    // Fetching todo index.
    const todoIndex = bucket.todoList.findIndex(todo => todo.todoKey === todoKey);

    return [bucket, index, todoIndex];
  }

  // Handles toggling to edit a todo or not.
  toggleTodoEdit = (bucket, todoIndex) => {
    return !bucket.todoList[todoIndex].todoEdit;
  }

  // Handles making a todo editabe or non editable depending on state a todo
  editTodoHandler = (bucketKey, todoKey) => {
    const [bucket, index, todoIndex] = this.fetchTodoInfoHandler(bucketKey, todoKey);

    // makes the Todo editable (converts it into an input field)
    bucket.todoList[todoIndex].todoEdit = this.toggleTodoEdit(bucket, todoIndex);
    this.updatedBucketStateHandler(bucket, index);
  }

  // Handles changes made with the Todo.
  changeTodoTextHandler = (bucketKey, todoKey, event) => {
    const [bucket, index, todoIndex] = this.fetchTodoInfoHandler(bucketKey, todoKey);
    // Changing the todo text.
    bucket.todoList[todoIndex].todoText = event.target.value;
    this.updatedBucketStateHandler(bucket, index);
  }

  // Handles deleting a Todo
  deleteTodoHandler = (bucketKey, todoKey) => {
    const [bucket, index, todoIndex] = this.fetchTodoInfoHandler(bucketKey, todoKey);

    // splicing a todo off the todo list.
    bucket.todoList.splice(todoIndex, 1);
    this.updatedBucketStateHandler(bucket, index);
  }

  // Render method.
  render() {
    // Renders 'Add' button based on bucket input field.
    let addBucketButton = null;
    if (this.state.bucketName) {
      addBucketButton = (
        <button
          onClick={this.addBucketHandler}>Add</button>
      )
    }

    // Handles rendering of bucket input field.
    let bucketInput = null;
    if (this.state.addInputBucket) {
      bucketInput = (
        <div>
          <input
            onChange={this.changeBucketInputHandler}
            type="text"
            value={this.state.bucketName}
            placeholder="Bucket name" />
          <button
            onClick={this.closeBucketInputHandler}>Cancel</button>
          {addBucketButton}
        </div>
      )
    }

    // Handles rendering buckets.
    const AllBuckets = this.state.bucketList.map(bucket => {
      return (
        <div>

          <Bucket
            bucketName={bucket.bucketName}
            key={bucket.bucketKey}
            todoList={bucket.todoList}
            todoInputvalue={bucket.todoInput}
            updateTodoInput={this.updateTodoInputHandler.bind(this, bucket.bucketKey)}
            addTodo={this.addTodoHandler.bind(this, bucket.bucketKey)}
            editTodo={todoKey => this.editTodoHandler(bucket.bucketKey, todoKey)}
            changeTodoText={(todoKey, event) => this.changeTodoTextHandler(bucket.bucketKey, todoKey, event)}
            deleteTodo={todoKey => this.deleteTodoHandler(bucket.bucketKey, todoKey)} />
          <hr />
        </div>
      )
    })

    // Rendering the component.
    return (
      <div>
        <div>
          <p>Add a new Bucket: </p>
          <button
            onClick={this.openInputBucketHandler}>Add a bucket</button>
          {bucketInput}
        </div>
        <hr />
        {AllBuckets}
      </div>
    );
  }
}

export default App;
