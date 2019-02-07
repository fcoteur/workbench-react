import React, { Component } from 'react';
import TodosApp from './TodosApp/TodoApps'
import Bookmarks from './BookmarksApp/BookmarksApp'

class App extends Component {
  render() {
    return (
      <div>
        <Bookmarks />
        <TodosApp />
      </div>
    );
  }
}

export default App;
