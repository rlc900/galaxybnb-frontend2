import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {

  handleEntrance = () => {
    if (localStorage.token) {
      return (
        <div>
          <Menu inverted pointing secondary>
           <Menu.Item>
            <Link to ='/home'>Home</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/profile'>Profile</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/update'>update username</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/logout'>Logout</Link>
           </Menu.Item>
         </Menu>
       </div>
      )
    } else {
      return (

          <Menu inverted pointing secondary>
           <Menu.Item>
            <Link to ='/home'>Home</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/signup'>Signup</Link>
           </Menu.Item>
           <Menu.Item>
            <Link to ='/login'>Login</Link>
           </Menu.Item>
         </Menu>

      )
    }
  }

  render() {
    return (
      <div>
        {this.handleEntrance()}
      </div>
    );
  }

}

export default NavBar;
