import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Box = styled.div`
  margin: 1px 0px;
`;

export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.strig,
      title: PropTypes.string,
      done: PropTypes.bool
    }).isRequired,
    delete: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        title: '',
        edit: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick() {
    this.setState({
      id: this.props.todo.id,
      title: this.props.todo.title,
      edit: true
    })
  }

  handleChange(e) {
    this.setState({title: e.target.value })
  }

  handleSubmit() {
    this.props.edit(this.state)
    this.setState({
      id: '',
      title: '',
      edit: false
    })
  }

  render() {
    const status = this.props.todo.done === false ? String.fromCharCode(0x2610) : String.fromCharCode(0x2611)
    const strikeThrough = this.props.todo.done === true ? {textDecoration: "line-through",color:"grey"} : {}
    return (
      <Box>
        <span style={{cursor: "pointer"}} onClick={this.props.toggle}>{status}</span> {' '}
        <span style={{cursor: "pointer"}} onClick={this.props.delete}>{String.fromCharCode(0xD83D,0xDDD1)}</span>{' '}
        
        <div style={{display: this.state.edit === true ? "none" : "inline"}}>
          <span style={strikeThrough} onClick={this.handleClick}>{this.props.todo.title}</span>
        </div>
        
        <div style={{display: this.state.edit === false ? "none" : "inline"}}>
          <input 
            id={this.props.todo.id}
            value={this.state.title} 
            autoComplete="off" 
            name='title' 
            onChange={this.handleChange} 
            
            onBlur={this.handleSubmit}
          />
        </div>
      </Box>
    )
  }
}
