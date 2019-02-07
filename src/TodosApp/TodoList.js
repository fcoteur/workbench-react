import React, { Component } from 'react'
import styled from 'styled-components';
import uuid from 'uuid'

import Todo from './Todo'
import NewTodoForm from './NewTodoForm';

const Box = styled.div`
  text-align: left;
`;

export default class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [
        {
          id: uuid.v4(),
          title: 'do something',
          done: false
        },
        {
          id: uuid.v4(),
          title: 'do something else',
          done: false
        },
        {
          id: uuid.v4(),
          title: 'do something completly different',
          done: true
        }
      ]
    }
    this.handleAddToDo = this.handleAddToDo.bind(this)
    this.handleEditToDo = this.handleEditToDo.bind(this)
  }

  handeDelete(e) {
    const { todos } = this.state;
    this.setState({todos: todos.slice(0, e).concat(todos.slice(e+1))})
  }

  handleToggle(idx) {
    let newTodos = this.state.todos.slice()
    newTodos[idx].done = !newTodos[idx].done;
    this.setState({todos: newTodos})
  }

  handleAddToDo(data) {
    let newTodos = this.state.todos.slice()
    newTodos.push({
      id: uuid.v4(),
      title: data.title,
      done: false
    })
    this.setState({todos: newTodos})
  }

  handleEditToDo(data) {
    let newTodos = this.state.todos.slice()
    const index = this.state.todos.findIndex(x => x.id === data.id);
    newTodos[index].title = data.title;
    this.setState({todos: newTodos})
  }

  onDragStart(e,idx) {
    e.dataTransfer.setData("startIdx", idx)
  }

  onDragOver(e, idx) {
    e.preventDefault()
  }

  onDrop(e, endIdx) {
    let startIdx = e.dataTransfer.getData("startIdx");
    let newTodos = this.state.todos.slice();
    let todoThatMoves = newTodos[startIdx];
    console.log(todoThatMoves)
    newTodos.splice(startIdx,1);
    if (endIdx>startIdx) {
      newTodos.splice(endIdx-1,0,todoThatMoves);
    } else {
      newTodos.splice(endIdx,0,todoThatMoves);
    }
    this.setState({todos: newTodos})

    console.log(startIdx,' is moved to ',endIdx)
  }

  render() {
    const list = this.state.todos.map((todo, idx) => {
      return (
      <div 
        key={todo.id}
        draggable 
        onDragOver={(e)=>this.onDragOver(e, idx)} 
        onDrop={(e) => {this.onDrop(e, idx)}}
        onDragStart={(e) => {this.onDragStart(e,idx)}}
      >
        <Todo  
        todo={todo} 
        delete={this.handeDelete.bind(this, idx)} 
        toggle={this.handleToggle.bind(this, idx)}
        edit={this.handleEditToDo.bind(this)}
        />
      </div>)
    });

    return (
      <Box>
        <NewTodoForm handleAddToDo={this.handleAddToDo}/>
        {list}
      </Box>
    );
  }
}
