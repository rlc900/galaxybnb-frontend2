import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

class Profile extends Component {

  handleClick = () => {
    // console.log('yo');
    this.props.handleDelete(this.props.stateFromMain.user.id)
  }

  renderBookedLocations = () => {
    // let {datesRange, numOfTravelers} = this.props.stateFromMain

    if (this.props.stateFromMain.user.locationsBooked) {
      return this.props.stateFromMain.user.locationsBooked.map((booked_location) => {

        return (<div key={booked_location.id} className='profile-div' align='center'>
    <Card.Group >
    <Card centered={true}>
    <Image src={booked_location.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{booked_location.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{booked_location.datesRange}</span>
      </Card.Meta>
      <Card.Description>
      Paid &{booked_location.price * booked_location.numOfTravelers}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Icon name='user' />
        {booked_location.numOfTravelers}
    </Card.Content>
  </Card>
  </Card.Group >
  </div>)
      })
    } else {
      return 'Not happenin'
    }

  }

  render() {
    console.log(this.props.stateFromMain.user.locationsBooked);
    let {user} = this.props.stateFromMain
    return (
      <div>
      <h2>{user.username}&apos;s Profile</h2>
      {this.renderBookedLocations()}
      <Button className='ui button' inverted color='red' onClick={this.handleClick}>Delete Profile</Button>
      </div>
    );
  }

}

export default Profile;
