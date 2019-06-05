import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

import ProjectList from '../Components/ProjectList'
import NewProject from '../Components/NewProject'


class Projects extends Component {

  render(){

    return(
      <div>
        <Header inverted color='grey' textAlign="center" as='h2'>Current Projects</Header>
        {this.props.projects.map(project =>(
          <ProjectList key={project.id} project={project.title} projects={this.props.projects} />
          ))
        }
        <center><NewProject /></center>
      </div>
    )
  }
}


export default Projects
