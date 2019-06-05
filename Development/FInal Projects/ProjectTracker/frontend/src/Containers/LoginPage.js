import React, { Component } from 'react';
import {  } from 'semantic-ui-react'

import Login from '../Components/Login'
// import Signup from '../Components/Signup'



class LoginPage extends Component {

  state ={
    login: true,
  }

  onClick = () => {
    this.setState({login: false})
  }

  render(){
    return (
      <Login />
    )
  }
}

export default LoginPage
