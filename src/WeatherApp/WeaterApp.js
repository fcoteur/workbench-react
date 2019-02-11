import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;

const Forecast = styled.div`
  padding: 5px 5px;
  text-align: center;
  display: inline-block;
  width: 40px;
`;

export default class WeaterApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null,
      city: 'Bilbao,es',
      selection: '',
      visible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  componentWillMount() {
    this.fetchForecast()
  }

  fetchForecast() {
    const urlWeather =  'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city +'&units=metric&appid=' + process.env.REACT_APP_APIKEY
   
    this.setState({ isLoading: true });

    axios.get(urlWeather)
      .then(result => {
        this.setState({data: result.data, isLoading: false})
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  handleChange(e) {
    this.setState({selection: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({city: this.state.selection, visible: false},() => this.fetchForecast())
  }

  toggleVisible() {
    this.setState({visible: !this.state.visible})
  }
  
  render() {
    const { data, isLoading, error } = this.state;

    /* if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading | !data) {
      return <p>Loading ...</p>;
    } */

    // select two forecasts per 24h and limit display to 4 days maximum
    if (data) {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      var forecastList = data.list.map((forecast,index) => {
        const time = new Date(forecast.dt*1000);
        if ((time.getHours() === 1 || time.getHours() === 13) && index < 32) {
          return (
            <Forecast>
              <span>{daysOfWeek[time.getDay()]}</span><br/>
              <img src={"http://openweathermap.org/img/w/" + forecast.weather[0].icon +".png"} alt={forecast.weather[0].description} /><br/>
              <span>{Math.round(forecast.main.temp)}°</span>
            </Forecast>
          )
        } 
      })
    }

    return (
      <Box>
        <span>
          <strong>Weather Forecast in </strong>
          <div style={{display: this.state.visible === false ? "none" : "inline"}} >
            <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
              <select value={this.state.selection} onChange={this.handleChange}>
                <option value="London,gb">London</option>
                <option value="Brussels,be">Brussels</option>
                <option value="Bilbao,es">Bilbao</option>
                <option value="Haarlem,nl">Haarlem</option>
              </select>
              <input type='submit' value={String.fromCharCode(0x21B5)} />
            </form>
          <button onClick={this.toggleVisible} style={{display: 'inline'}}>{String.fromCharCode(0x2A2F)}</button>
        </div>
        </span>
        <span style={{display: this.state.visible === true ? "none" : "inline"}} onClick={this.toggleVisible}>{this.state.city}</span>
        <br/>
        {forecastList}
      </Box>
    )

  }
}
