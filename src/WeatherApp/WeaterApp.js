import React, { Component } from 'react'
import styled from 'styled-components';

import WeatherForcast from './WeatherForecast'
import WeatherForm from './WeatherForm'
import WeaterCurrent from './WeatherCurrent';

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;

export default class WeaterApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      city: 'Bilbao,es'
    };
    this.handleNewCity = this.handleNewCity.bind(this)
  }

  handleNewCity(city) {
    this.setState({city})
  }

  render() {
    return (
      <Box>
        <WeatherForm city={this.state.city} newCity={this.handleNewCity}/>
        <WeaterCurrent city={this.state.city}/>
        <WeatherForcast city={this.state.city}/>
      </Box>
    )

  }
}
