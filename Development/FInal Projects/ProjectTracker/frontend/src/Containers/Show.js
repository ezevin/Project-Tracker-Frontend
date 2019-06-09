import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Header, Grid, Button, Divider, Checkbox, Container } from 'semantic-ui-react'

import Materials from './Materials'
import ProjectMaterials from './ProjectMaterials'
import FinishedPictures from './FinishedPictures'
import StartDate from '../Forms/StartDate'
import Budget from '../Forms/Budget'
import DueDate from '../Forms/DueDate'
import Notes from '../Forms/Notes'
import Finished from '../Forms/Finished'
import Title from '../Forms/Title'

class Show extends Component {
  state = {
    search: '',
  }


  handleSearch = (e, {value}) => {
    this.setState({search: value})
    // console.log(value)
  }

  handleClick = () => {
    const { finished } = this.state
    this.setState({finished: true})
    console.log("state",this.state);
    fetch(`http://localhost:3001/api/v1/projects/${this.props.projectId}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ finished: true })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        // .then(this.props.history.push('home'))
        .then(() =>this.props.fetchProjects())
  }

  render(){
    const { projectId, projects, materials, projectMaterials } = this.props
    const filteredMaterials = projectMaterials.filter(material =>{
      // console.log(material.label);
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

    return (projects.map(project => {
      if(project.id === projectId){
        return (
          <div key={project.id}>
              <Header inverted color='grey' textAlign='center' as='h1'>{project.title}
                <Title id={project.id} title={project.title} fetchProjects={this.props.fetchProjects}/>
              </Header>

            <Grid>
              <Grid.Row>
                <Grid.Column width={6} floated='left'>Date Started: {project.start_date}
                  <StartDate id={project.id} start_date={project.start_date} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={5}>
                  <Finished projectId={this.props.projectId} finished={project.finished} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={3} floated='right'>Date Due: {project.due_date}
                  <DueDate id={project.id} due_date={project.due_date} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Column width={6} floated='left'>Budget: ${project.budget}
                <Budget id={project.id} budget={project.budget} fetchProjects={this.props.fetchProjects}/>
              </Grid.Column>

              <Grid.Column width={3} floated='right'>Remaining Budget: $</Grid.Column>
            </Grid>

            <Divider inverted/>
            <br />

              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Header inverted color='grey' textAlign='center' as='h3'>Notes:  <Notes id={projectId} details={project.details} fetchProjects={this.props.fetchProjects}/></Header><br />
                  <Container>{project.details}</Container>
                </Grid.Column>

                <Grid.Column  width={6}>
                  <Header inverted color='grey' textAlign='center' as='h3'>To Do List:</Header><br />
                  <Checkbox color="white" label='Make my profile visible' />
                  <Checkbox color="white" label='Make my profile visible' />
                  <Checkbox color="white" label='Make my profile visible' />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <ProjectMaterials
                    id={project.id}
                    materials={this.props.projectMaterials}
                    allMaterials={this.props.materials}
                    fetchProjectMaterials={this.props.fetchProjectMaterials}
                    addProjectMaterial={this.props.addProjectMaterial}
                    deleteMaterial={this.props.deleteProjectMaterials}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <FinishedPictures projects={this.props.finished}/>
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <FinishedPictures projects={this.props.finished}/>
                </Grid.Column>
              </Grid>
              <Button onClick={()=> this.props.deleteProject(project.id)}>Delete Project</Button>
            </div>
      )}else {
        // return this.props.history.push("home")
      }

    }))
  }
}

export default withRouter(Show)







// <Finished id={project.id} fetchProjects={this.props.fetchProjects} finished={project.finished}/>
