import React, { Component } from 'react'
import styled from 'styled-components';
import uuid from 'uuid'

import Bookmark from './Bookmark'
import NewBookmarkForm from './NewBookmarkForm';

const Box = styled.div`
  text-align: left;
`;

export default class BookmarkList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {
          id: uuid.v4(),
          title: 'something1',
          url: 'https://google.com'
        },
        {
          id: uuid.v4(),
          title: 'something2',
          url: 'https://google.com'
        },
        {
          id: uuid.v4(),
          title: 'something3',
          url: 'https://google.com'
        }
      ]
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handeDelete(e) {
    const { data } = this.state;
    this.setState({data: data.slice(0, e).concat(data.slice(e+1))})
  }

  handleAdd(data) {
    let newData = this.state.data.slice()
    newData.push({
      id: uuid.v4(),
      title: data.title,
      url: data.url,
    })
    this.setState({data: newData})
  }

  handleEdit(data) {
    let newData = this.state.data.slice()
    const index = this.state.data.findIndex(x => x.id === data.id);
    newData[index].title = data.title;
    newData[index].url = data.url;
    this.setState({data: newData})
  }

  onDragStart(e,idx) {
    e.dataTransfer.setData("startIdx", idx)
  }

  onDragOver(e, idx) {
    e.preventDefault()
  }

  onDrop(e, endIdx) {
    let startIdx = e.dataTransfer.getData("startIdx");
    let newData = this.state.data.slice();
    let recThatMoves = newData[startIdx];
    
    newData.splice(startIdx,1);
    
    if (endIdx>startIdx) {
      newData.splice(endIdx-1,0,recThatMoves);
    } else {
      newData.splice(endIdx,0,recThatMoves);
    }
    this.setState({data: newData})
  }

  render() {
    const list = this.state.data.map((record, idx) => {
      return (
      <div 
        key={record.id}
        draggable 
        onDragOver={(e)=>this.onDragOver(e, idx)} 
        onDrop={(e) => {this.onDrop(e, idx)}}
        onDragStart={(e) => {this.onDragStart(e,idx)}}
      >
        <Bookmark  
          bookmark={record} 
          delete={this.handeDelete.bind(this, idx)} 
          edit={this.handleEdit.bind(this)}
        />
      </div>)
    });

    return (
      <Box>
        <NewBookmarkForm handleAdd={this.handleAdd}/>
        {list}
      </Box>
    );
  }
}