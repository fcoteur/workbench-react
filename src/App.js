import React, { Component } from 'react';
import TodosApp from './TodosApp/TodoApps'
import Bookmarks from './BookmarksApp/BookmarksApp'
import WeatherApp from './WeatherApp/WeaterApp'

class App extends Component {
  render() {
    return (
      <div>
        <Bookmarks />
        <TodosApp />
        <WeatherApp />
      </div>
    );
  }
}

export default App;
