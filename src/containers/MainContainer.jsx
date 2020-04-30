import React, { Component } from 'react';
import UserForm from '../components/UserForm'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Profile from '../components/Profile'
import PlanetLocations from '../components/PlanetLocations'

import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'



class MainContainer extends Component {

  state = {
    user: {
      username: '',
      reviewed_locations: []
      },
    token: '',
    error_message: '',
    planets: [],
    datesRange: '',
    numOfTravelers: '',
    selectedPlanet: '',
    planetObj: {}
  }

  addReview = (reviewObj) => {
    // debugger
    let modifiedLocations = this.state.planetObj.locations.map((location) => {
        if (location.id === reviewObj.reviewed_location_id) {
          return {...location, reviews: [...location.reviews, reviewObj]}
        } else {
          return location
        }
      })
        this.setState({
          planetObj: {...this.state.planetObj, locations: modifiedLocations}
        })
  }

  addBooking = (bookingObj) => {
    let modifiedBookings = [...this.state.user.locationsBooked, bookingObj]
    this.setState({
      user: {...this.state.user, locationsBooked: modifiedBookings}

    }, () => {
      this.props.history.push('/profile')
    })

  }

  componentDidMount() {
    // info persisted when page refreshes
    if(localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      fetch(`https://galaxybnb-backend.herokuapp.com/persist`, {
        headers: {
        'Authorization': `bearer ${token}`
      }
      })
      .then(r => r.json())
      .then(userData => {
        if (userData.token) {
          localStorage.setItem('token', userData.token)
          this.setState({
            user: {...userData.user, username: userData.user.username},
            token: userData.token
          }, () => {
             this.props.history.push('/home')
          })
        }
      })
    }

    fetch(`https://galaxybnb-backend.herokuapp.com/planets`)
        .then(r => r.json())
        .then((planetArr) => {
          // console.log(planetArr[0].name)
          this.setState({
            planets: planetArr
          });
        })
  }

  handleSubmit = (userInfo, route, method) => {
    // console.log(route)
    // console.log('Form has been submitted')
    fetch(`https://galaxybnb-backend.herokuapp.com${route}`, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    .then(userData => {
      // console.log(userData)
      if (!userData.error) {
        localStorage.setItem('token', userData.token)
        this.setState({
          user: {...userData.user, username: userData.user.username},
          token: userData.token
        }, () => {
           this.props.history.push('/profile')
        })
      }
      this.setState({
        error_message: userData.error
      })
      // console.log(userData)
    })
  }


renderForm = (routerProps) => {
  let {pathname} = routerProps.location
  let {error_message, user} = this.state
    // console.log(routerProps)
    if (pathname === '/signup') {
      return <UserForm formName='Signup' handleFormSubmit={this.handleSubmit} error={error_message} user={user} {...routerProps}/>
    } else if (pathname === '/login') {
      return <UserForm formName='Login' handleFormSubmit={this.handleSubmit} error={error_message} user={user} {...routerProps}/>
    }  else if (routerProps.location.pathname === '/update') {
      return <UserForm formName='update username' handleFormSubmit={this.handleSubmit} error={error_message} user={user} {...routerProps}/>
    }
  }

  renderProfile = () => {
    return <Profile handleDelete={this.handleDelete} stateFromMain={this.state}/>
  }

  renderLogout = (routerProps) => {
    this.setState({
      user: {},
      token: ''
    })
    localStorage.clear()
    routerProps.history.push('/home')
  }



  handleDelete = (id) => {
    fetch(`https://galaxybnb-backend.herokuapp.com/users/${id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      localStorage.clear()
      window.location.href = "/home"
    })
  }

  sendToMain = (selectedPlanet, datesRange, numOfTravelers) => {
    this.setState({
      selectedPlanet: selectedPlanet,
      datesRange: datesRange,
      numOfTravelers: numOfTravelers
    })
  }


  getPlanetObj = (newPlanetObj) => {
    this.setState({planetObj: newPlanetObj})
  }


  render() {
    console.log('MAIN CONT STATE', this.state)
    // console.log('STATE FROM MAIN_CONTAINER', this.state)
    return (
      <div className='main-container'>
      <NavBar />
      <Switch>
        <Route exact path={['/', '/home']} render={(props) => <Home {...props} sendToMain={this.sendToMain} stateFromMain={this.state}/>}/>
        <Route path='/signup' render={this.renderForm}/>
        <Route path='/login' render={this.renderForm}/>
        <Route path='/profile' render={this.renderProfile}/>
        <Route path='/logout' render={this.renderLogout}/>
        <Route path='/update' render={this.renderForm}/>
        <Route path='/places/:id' render={(props) => <PlanetLocations {...props} addBooking={this.addBooking} getPlanetObj={this.getPlanetObj} stateFromMain={this.state} addReview={this.addReview}/>}/>


      </Switch>
      </div>
      );
    }

}

export default withRouter(MainContainer);
