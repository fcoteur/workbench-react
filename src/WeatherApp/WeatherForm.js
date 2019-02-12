import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class WeatherForm extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    newCity: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      selection: '',
      visible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  handleChange(e) {
    this.setState({selection: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.newCity(this.state.selection);
    this.setState({city: this.state.selection, visible: false})
  }

  toggleVisible() {
    this.setState({visible: !this.state.visible})
  }
  
  render() {
    return (
      <div>
        <span>
          <strong>Weather in </strong>
          
          <div style={{display: this.state.visible === false ? "none" : "inline"}} >
            <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
              <select value={this.state.selection} onChange={this.handleChange}>
                <option value="London,gb">London</option>
                <option value="Brussels,be">Brussels</option>
                <option value="Bilbao,es" selected="selected">Bilbao</option >
                <option value="Haarlem,nl">Haarlem</option>
              </select>
              <input type='submit' value={String.fromCharCode(0x21B5)} />
            </form>
            <button onClick={this.toggleVisible} style={{display: 'inline'}}>{String.fromCharCode(0x2A2F)}</button>
          </div>

        </span>
        <span style={{display: this.state.visible === true ? "none" : "inline"}} onClick={this.toggleVisible}>{this.props.city}</span>
      </div>
    )

  }
}
