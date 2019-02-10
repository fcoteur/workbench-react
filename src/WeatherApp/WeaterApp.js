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
    };
  }

  componentDidMount() {

    const urlWeather =  'https://api.openweathermap.org/data/2.5/forecast?q=Bilbao,es&units=metric&appid=' + process.env.REACT_APP_APIKEY
   
    this.setState({ isLoading: true });

    axios.get(urlWeather)
      .then(result => {
        this.setState({data: result.data, isLoading: false})
        console.log(result.data)
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  
  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading | !data) {
      return <p>Loading ...</p>;
    }

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
        <span><strong>Weather Forecast in </strong>{data.city.name}</span><br/>
        {forecastList}
      </Box>
    )

  }
}
