import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import axios from 'axios';

const Forecast = styled.div`
  padding: 5px 5px;
  text-align: center;
  display: inline-block;
  width: 40px;
`;

export default class WeaterForecast extends Component {

  static propTypes = {
    city: PropTypes.string.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
    this.fetchForecast = this.fetchForecast.bind(this)
  }

  componentDidMount() {
    this.fetchForecast()
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.fetchForecast()
    }
  }

  fetchForecast() {
    const urlWeather =  'https://api.openweathermap.org/data/2.5/forecast?q=' + this.props.city +'&units=metric&appid=' + process.env.REACT_APP_APIKEY
   
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
  
  render() {

    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading | !data) {
      return <p>Loading ...</p>;
    } 

    // select two forecasts per 24h and limit display to 4 days maximum
    if (data) {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      var forecastList = data.list.map((forecast,index) => {
        const time = new Date(forecast.dt*1000);
        if ((time.getHours() === 1 || time.getHours() === 13) && index < 32) {
          return (
            <Forecast>
              <span>{time.getHours()===1 ? '' : daysOfWeek[time.getDay()]}</span><br/>
              <img src={"http://openweathermap.org/img/w/" + forecast.weather[0].icon +".png"} alt={forecast.weather[0].description} /><br/>
              <span>{Math.round(forecast.main.temp)}°</span>
            </Forecast>
          )
        } 
      })
    }

    return (
      <div>
        {forecastList}
      </div>
    )

  }
}
