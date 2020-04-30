import React, { Component } from 'react';
import { Form, Select } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react';


let numberOptions = [
  {text: '1', value: '1'},
  {text: '2', value: '2'},
  {text: '3', value: '3'},
  {text: '4', value: '4'},
  {text: '5', value: '5'},
  {text: '6', value: '6'},
  {text: '7', value: '7'},
  {text: '8', value: '8'},
  {text: '9', value: '9'},
  {text: '10', value: '10'}
]

const initialState = {
  planets: [],
  datesRange: '',
  numOfTravelers: '',
  selectedPlanet: '',
  planetError: '',
  datesError: '',
  travelersError: ''
}


class BookingForm extends Component {

  state = initialState

  validate = () => {
    let planetError = ''
    let datesError = ''
    let travelersError = ''
    let {selectedPlanet, datesRange, numOfTravelers} = this.state
    let isValid = true

    if (!selectedPlanet) {
      planetError = 'Please select a planet!'
      isValid = false
    }

    if (!datesRange) {
      datesError = 'Please select a date!'
      isValid = false
    }

    if (!numOfTravelers) {
      travelersError = 'Please select a number of travelers!'
      isValid = false
    }

    // if (selectedPlanet || datesRange || numOfTravelers) {
      this.setState({planetError, datesError, travelersError})
      return isValid
    // }
    // return true
  }

  handleSubmit = (evt, id) => {
    evt.preventDefault()
    const isValid = this.validate()
    let {selectedPlanet} = this.state

    if (isValid) {
      this.setState(initialState)
      this.props.history.push(`/places/${selectedPlanet}`)
      this.valuesFromBooking()
    }
  }
  //
  formatOptions = () => {
    return this.props.stateFromMain.planets.map(planet => {
      return {
        text: planet.name,
        value: planet.id
      }
    })
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
  //
  valuesFromBooking = () => {
    let {selectedPlanet, datesRange, numOfTravelers} = this.state
      this.props.sendToMain(selectedPlanet, datesRange, numOfTravelers)
  }


  render() {
    // console.log(this.state)
    console.log(this.props.stateFromMain)
    return (
      <div className='booking-form' align='center'>

      <Form onSubmit={this.handleSubmit}>

        <Form.Group widths='equal'>
        <Form.Field
            control={Select}
            label='Choose a Planet'
            options={this.formatOptions()}
            onChange={this.handleChange}
            name={'selectedPlanet'}
            placeholder='Planets'
          />
        </Form.Group>
        <div className='div-error' color='red'>{this.state.planetError}</div>
        <Form.Group >
        < DatesRangeInput
         className='dateForm'
         name="datesRange"
         label="From - To"
         placeholder="From - To"
         value={this.state.datesRange}
         iconPosition="left"
         onChange={this.handleChange}
         autoComplete='off'
        />
        </Form.Group>
      <div className='div-error' color='red'>{this.state.datesError}</div>
        <Form.Group widths='equal'>
        <Form.Select
          label='How many travelers?'
          options={numberOptions}
          onChange={this.handleChange}
          name={'numOfTravelers'}
          placeholder='Travelers'
        />
      </Form.Group>
        <div className='div-error' color='red'>{this.state.travelersError}</div>
        <Form.Button inverted color='red'>Submit</Form.Button>
      </Form>

      </div>
    );
  }

}

export default BookingForm;
