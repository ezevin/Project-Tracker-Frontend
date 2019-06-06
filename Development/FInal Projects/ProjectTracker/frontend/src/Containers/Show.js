import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { } from 'react-router-dom'
import { Header, Grid, Button, Divider, Checkbox, Container } from 'semantic-ui-react'

import Materials from './Materials'
import FinishedPictures from './FinishedPictures'
import HeadShow from '../Components/HeadShow'
import StartDate from '../Forms/StartDate'
import Budget from '../Forms/Budget'
import DueDate from '../Forms/DueDate'
import Notes from '../Forms/Notes'
import Finished from '../Forms/Finished'
import Title from '../Forms/Title'




class Show extends Component {
  state = {
    search: ''

  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    // console.log(value)
  }

  render(){
    const { projectId, projects, materials } = this.props
    const filteredMaterials = materials.filter(material =>{
      // console.log(material.label);
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })
    return (projects.map(project => {
      if(project.id === projectId){
        console.log(project);
        return (
          <div key={project.id}>
              <Header inverted color='grey' textAlign='center' as='h1'>{project.title}  <Title id={project.id} title={project.title} fetchProjects={this.props.fetchProjects}/></Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6} floated='left'>Date Started: {project.start_date} <StartDate id={project.id} start_date={project.start_date} fetchProjects={this.props.fetchProjects}/></Grid.Column>
                <Grid.Column width={5}><Button>I've Finished!</Button></Grid.Column>
                <Grid.Column width={3} floated='right'>Date Due: {project.due_date} <DueDate id={project.id} due_date={project.due_date} fetchProjects={this.props.fetchProjects}/></Grid.Column>
              </Grid.Row>
              <Grid.Column width={6} floated='left'>Budget: ${project.budget} <Budget id={project.id} budget={project.budget} fetchProjects={this.props.fetchProjects}/></Grid.Column>
              <Grid.Column width={3} floated='right'>Remaining Budget: $</Grid.Column>
            </Grid>
            <Divider inverted/>
            <br />
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Header inverted color='grey' textAlign='center' as='h3'>Notes:  <Notes id={project.id} details={project.details} fetchProjects={this.props.fetchProjects}/></Header><br />
                  <Container contenteditable="true">{project.details}</Container>
                </Grid.Column>
                <Grid.Column  width={6}>
                  <Header inverted color='grey' textAlign='center' as='h3'>To Do List:</Header><br />
                  <Checkbox color="white" label='Make my profile visible' />
                  <Checkbox color="white" label='Make my profile visible' />
                  <Checkbox color="white" label='Make my profile visible' />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Materials materials={filteredMaterials} handleSearch={this.handleSearch}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <FinishedPictures projects={this.props.projects}/>
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <FinishedPictures projects={this.props.projects}/>
                </Grid.Column>
              </Grid>
              <Button onClick={()=> this.props.deleteProject(project.id)}>Delete Project</Button>
            </div>
      )}else {
        return console.log("nope");
        // return this.props.history.push("home")
      }

    }))
  }
}

export default Show
