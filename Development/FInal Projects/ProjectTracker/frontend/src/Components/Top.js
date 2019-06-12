import React, { Component } from 'react';
import { Header, Menu, Dropdown } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'



class Top extends Component {

  dropDown = (id) => {
    // this.props.history.push(`/show/${id}`)
    fetch(`http://localhost:3001/api/v1/projects/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projectMaterials: data.materials, pId: id, researches: data.researches, toDoList: data.to_do_lists, notes: data.notes}))
    // .then(this.props.history.push(`/show/${id}`))
  }

  render(){
    return (
      <div><br />
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
                  <Link to={`/show/${project.id}`}>
                    <Dropdown.Item onClick={()=>this.dropDown(project.id)}>{project.title}</Dropdown.Item>
                  </Link>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item>
          <h1> FabFolio: </h1>
          </Menu.Item>
          <Menu.Item><h4> A Fabricator's Portfolio </h4></Menu.Item>

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

export default withRouter(Top)
