import React, { Component } from 'react';
import {Header} from 'semantic-ui-react'
import BookingForm from './BookingForm'

class Home extends Component {
// write a function in {MainCont} called sendStateToMain and send it down as props to the child {Home} and to the next child {BookingForm} which will invoke that function with the appropriate arguments on submit.
// when function gets invoked, state flows up to {MainCont}.
// Now that state is in {MainContainer}, send it down to {PlanetLocations} as props.

  render() {
    // console.log('PROPS FROM HOME', this.props)
    // let {sendStateToMain} = this.props
    return (
      <div className='home' >
      <Header as='h1' align='center'>Galaxybnb</Header>
      <BookingForm history={this.props.history} sendToMain={this.props.sendToMain} stateFromMain={this.props.stateFromMain}/>
      </div>
    );
  }

}

export default Home;
