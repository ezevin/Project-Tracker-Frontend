import React, { Component } from 'react'
import { Dropdown, Container } from 'semantic-ui-react'
import { } from 'react-router-dom'


  class ProjectList extends Component {

    render() {
      return (
        <>
        <Container align="center">
          <Dropdown  text={this.props.project}>
           <Dropdown.Menu>
             <Dropdown.Item text='To Do List' />
           </Dropdown.Menu>
          </Dropdown><br /><br />
        </Container>
        </>
      )

    }
  }


export default ProjectList
