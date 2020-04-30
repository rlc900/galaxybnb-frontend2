import React, { Component } from 'react';
import { Grid, Image, Card, Button, Icon, Modal, Header } from 'semantic-ui-react'
import Emoji from './Emoji'
import ReviewForm from './ReviewForm'
import StripeCheckout from 'react-stripe-checkout'
// import Review from './Review'



class PlanetLocations extends Component {

  state = {
    open: false,
    location_id: 0
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  sendData = (planetObj) => {
    this.props.getPlanetObj(planetObj);
  }

  componentDidMount() {
    // debugger;
    let planetId = this.props.match.params.id;
    // console.log(planetId)
    // debugger
    fetch(`https://galaxybnb-backend.herokuapp.com/planets/${planetId}`)
    .then(r => r.json())
    .then(planetObj => {
      this.sendData(planetObj)
    })
  }

  renderPlanetNames = () => {
    return this.props.stateFromMain.planets.map((planet) => {
      return (
        planet ? planet.name : 'meow'
      )
    })
  }

  handleClick = (evt) => {
    // console.log(this.state.location_id, this.props.stateFromMain.token)
    // let {token} = this.props.stateFromMain

    // if (token) {
      fetch('https://galaxybnb-backend.herokuapp.com/bookings', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${this.props.stateFromMain.token}`
        },
        body: JSON.stringify({
          location_id: this.state.location_id,
          datesRange: this.props.stateFromMain.datesRange,
          numOfTravelers: this.props.stateFromMain.numOfTravelers
        })
      })
      .then(r => r.json())
      // .then(console.log)
      .then(bookingObj => {
        this.props.addBooking(bookingObj)
      })
  }

  // STRIPE FETCH

  onToken = (token) => {
    const charge = {
      token: token.id
    };
    let location_id = this.state.location_id
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        charge: charge,
        location_id,
        numOfTravelers: this.props.stateFromMain.numOfTravelers
      })
  }
  // debugger
  fetch('https://galaxybnb-backend.herokuapp.com/charges', config)
    .then(res => res.json())
    .then(charge => {
      if (charge) {
        this.handleClick()
      }
    })

  }

  nestedModal = () => {
   const { open } = this.state

    return  <Modal
      open={open}
      onOpen={this.open}
      onClose={this.close}
      size='small'
      trigger={
        <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_STRIPE_API_KEY}>
        <Button
          disabled={ this.props.stateFromMain.token ? false : true}
          circular={true}
          inverted color='red'
        >
        Book Location <Icon name='right chevron' />
        </Button>
      </StripeCheckout>
      }
    >
    </Modal>
  }

  handleBooking = (id) => {
    this.setState({
      location_id: id
    })
  }

  renderLocations = (state) => {
    let {datesRange, numOfTravelers} = this.props.stateFromMain
    let {name} = this.props.stateFromMain.planetObj
      return this.props.stateFromMain.planetObj.locations ? this.props.stateFromMain.planetObj.locations.map((locationObj) => {
        return <Grid.Column key={locationObj.id}>
          <Card.Group >
           <Card centered={true} stackable='true' itemsperrow={3} color='black'>
            <Image src={locationObj.image} wrapped ui={false} />
            <Card.Content>
              <h1>{locationObj.name}</h1>
                <Card.Header>&{locationObj.price} galactic credits</Card.Header>
              <Modal trigger={
                <div>
                <Button animated inverted color='red' size='small' onClick={() => this.handleBooking(locationObj.id)}
                ><Button.Content visible>Board Ship</Button.Content>
                  <Button.Content hidden>
                    <Emoji symbol="🚀🚀🚀" label="spaceship"/>
                  </Button.Content></Button>
                </div>}>
                <Modal.Header>Confirmation</Modal.Header>
                  <Modal.Content image>
                    <div className='image'>
                      <Image wrapped size='medium' src='../baby_yoda.png' />
                    </div>
                    <Modal.Description >
                    <h1 className='planet-name'>Planet: { name }</h1>
                    <h1>Location: {locationObj.name}</h1>
                    <h2>Date Range: { datesRange }</h2>
                    <h3>Number of Travelers: { numOfTravelers }</h3>
                    <h3>Price: {locationObj.price * numOfTravelers}</h3>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    {this.nestedModal()}
                  </Modal.Actions>
              </Modal>

              <Modal trigger={
                <Button inverted color='red'>
                <Button.Content visible>Reviews</Button.Content>
                </Button>
                }>
              <Modal.Header>{locationObj.name}</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='medium' src={locationObj.image} />
                  <Modal.Description>
                  <Header></Header>
                  {locationObj.reviews.map((review) => {
                    return <div className='review'><p>{review.rating} - {review.username}</p></div>
                  })}
                  <ReviewForm token={this.props.stateFromMain.token} addReview={this.props.addReview} locationId={locationObj.id} error_message={this.props.stateFromMain.error_message}/>

                 </Modal.Description>
               </Modal.Content>
              </Modal>
              </Card.Content>
             </Card>
             </Card.Group>
          </Grid.Column>

      }) : 'The force is not with you.'
  }


  render() {
    // debugger;
    // console.log('STATE FROM PLANET_LOCATIONS', this.state.planetObj)
    console.log('PROPS FROM PLANET_LOCATIONS', this.props.stateFromMain);
    // console.log(this.state);
    // console.log('PROPS FROM PLANET_LOCATIONS', this.props.stateFromMain.planetObj.locations)
    let {name} = this.props.stateFromMain.planetObj
      return (
        <div >
        <Grid centered columns={2}>
        <Grid.Column>
        <h1>Planet {name}</h1>
          <Image src={this.props.stateFromMain.planetObj.image} />
        </Grid.Column>
        <Grid.Row centered columns={4}>
        </Grid.Row>
        </Grid>
        {this.renderLocations()}
        </div>
      );
  }
}
// {locationObj.reviews.map((review) => {
//   return <p>{review.rating} - me</p>
// })}

export default PlanetLocations;
