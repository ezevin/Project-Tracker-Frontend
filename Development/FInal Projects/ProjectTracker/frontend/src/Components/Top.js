import React, { Component } from 'react';
import { Header, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class Top extends Component {


  render(){
    // const name = this.props.currentUser.map(user => user.username)
    return (
      <div>
       <br />
       <Header  inverted color='grey' textAlign='center' as='h1'>FabFolio</Header>
       <Header  inverted color='grey' textAlign='center' as='h3'>A Fabricator's Portfolio</Header>
       <br />
       <Menu >
        <Link to="/home" >
          <Menu.Item name='home'>
              Home
          </Menu.Item>
        </Link>

        <Link to={`/gallery/${this.props.id}`}>
          <Menu.Item name='gallery' >
              Gallery
          </Menu.Item>
        </Link>


          <Menu.Item name='current projects'>
            <Dropdown item text='Current Projects'>
              <Dropdown.Menu>
              {this.props.projects.map(project => (
                <Link to={`/show/${project.id}`} key={project.id} onClick={()=>this.props.dropDown(project.id)}>
                  <Dropdown.Item>{project.title}</Dropdown.Item>
                </Link>
              ))}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>


        <Menu.Menu position='right'>

          {
            this.props.currentUser &&
            <Menu.Item
              float='right'
              name='logout'>
              {`Welcome ${this.props.currentUser.username}`}
            </Menu.Item>
          }
          <Link to="/profile">
            <Menu.Item name='profile'>
                Profile
            </Menu.Item>
          </Link>

          <Link to="/login">
            {
              this.props.currentUser ?
              <Menu.Item
                float='right'
                name='logout'
                onClick={this.props.handleLogout}>
                Logout
              </Menu.Item>
              :
              <Menu.Item
              float='right'
              name='login'>
              Login
              </Menu.Item>
            }
          </Link>

        </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Top
