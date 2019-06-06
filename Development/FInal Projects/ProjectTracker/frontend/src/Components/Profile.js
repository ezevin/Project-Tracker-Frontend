import React, { Component } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Profile extends Component {

  render(){
    return (
      <div>
        <center className="textMedium">About Me</center>
        <Image src=""/>
        <span className="color">Name:  </span><br /><br />
        <span className="color">Age:  </span><br /><br />
        <span className="color">About Me: "" </span><br /><br />
        <Link to="/editProfile">
          <Button className="color" color="black">Edit My Profile</Button>
        </Link>

      </div>
    )
  }
}

export default Profile
