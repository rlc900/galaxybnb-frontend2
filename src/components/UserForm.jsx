import React, { Component } from 'react';
import { Header, Form } from 'semantic-ui-react'

class UserForm extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    // console.log(this.props.user);
  let path = window.location.pathname
  let userInfo = this.state

  if (path === '/signup') {
    this.props.handleFormSubmit(userInfo, path, 'POST')
  } else if (path === '/login') {
    this.props.handleFormSubmit(userInfo, path, 'POST')
  } else  {
    this.props.handleFormSubmit({username: this.state.username}, `/users/${this.props.user.id}`, 'PATCH')
    }
}

  handleOnChange = (evt) => {
    // console.log(evt.target.value)
    let {name, value} = evt.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {username, password} = this.state
    let {formName} = this.props
    let path = window.location.pathname
    // console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
      <Header>{formName}</Header>
          <div className='field'>
            <label htmlFor='username'>username:</label>
              <input type='text' autoComplete='off'onChange={this.handleOnChange} value={username} name='username'/>
          </div>
          <div className='field'>
            { path === '/update' ?
              null :
            <>
              <label htmlFor='password'>Password:</label>
              <input type='password' autoComplete='off' onChange={this.handleOnChange} value={password} name='password'/>
            </>
            }
         </div>
        <Form.Button inverted color='red'>Submit</Form.Button>
        <h2>{this.props.error}</h2>
      </form>
    );
  }

}

export default UserForm;
