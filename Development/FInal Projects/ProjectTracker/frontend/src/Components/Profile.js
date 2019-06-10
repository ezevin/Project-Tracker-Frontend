import React, { Component } from 'react'
import { Image, Card } from 'semantic-ui-react'
import { } from 'react-router-dom'

import AboutMe from '../Forms/AboutMe'
import Name from '../Forms/Name'
import Age from '../Forms/Age'
import ProfilePic from '../Forms/ProfilePic'

class Profile extends Component {

  render(){

    const { username, name, age, about_me, profile_picture, id } = this.props.user
      return (
        <div>
        <center className="textMedium">{username}'s Profile</center>
        <ProfilePic id={id} fetchUserData={this.props.fetchUserData}/><Card><Image src={profile_picture} image={profile_picture}/></Card>
        <span className="color"><Name id={id} fetchUserData={this.props.fetchUserData} name={name}/>Name: {name}</span><br /><br />
        <span className="color"><Age id={id} fetchUserData={this.props.fetchUserData} age={age}/>Age: {age} </span><br /><br />
        <span className="color"><AboutMe id={id} fetchUserData={this.props.fetchUserData} about_me={about_me}/>About Me: "{about_me}"</span><br /><br />
        </div>
      )
  }
}

export default Profile
