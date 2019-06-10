import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Header, Grid, Button, Divider, Container } from 'semantic-ui-react'

import ProjectMaterials from './ProjectMaterials'
import StartDate from '../Forms/StartDate'
import Budget from '../Forms/Budget'
import DueDate from '../Forms/DueDate'
import Notes from '../Forms/Notes'
import Finished from '../Forms/Finished'
import Title from '../Forms/Title'
import ResearchImages from './ResearchImages'
import ToDo from './ToDo'


class Show extends Component {
  state = {
    search: ''
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    // console.log(value)
  }


  render(){

    const prices = this.props.projectMaterials.map(material => material.price)
    const total = prices.reduce((a,b) => a+b, 0)

    const { projectId, projects, projectMaterials } = this.props
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

            <Grid padded>
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

              <Grid.Column width={3} floated='right'>Remaining Budget: ${project.budget - total}</Grid.Column>
            </Grid>

            <Divider inverted/>
            <br />

              <Grid padded>
                <Grid.Column floated='left' width={5}>
                  <Header inverted color='grey' textAlign='center' as='h3'>Notes:  <Notes id={projectId} details={project.details} fetchProjects={this.props.fetchProjects}/></Header><br />
                  <Container>{project.details}</Container>
                </Grid.Column>

                <Grid.Column  width={6}>
                  <ToDo fetchToDoList={this.props.fetchToDoList} toDoList={this.props.toDoList} projectId={projectId} deleteToDo={this.props.deleteToDo}/>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <ProjectMaterials
                    id={project.id}
                    materials={filteredMaterials}
                    handleSearch={this.handleSearch}
                    allMaterials={this.props.materials}
                    fetchProjectMaterials={this.props.fetchProjectMaterials}
                    addProjectMaterial={this.props.addProjectMaterial}
                    deleteMaterial={this.props.deleteProjectMaterials}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <ResearchImages fetchResearchImages={this.props.fetchResearchImages} researches={this.props.researches} projectId={projectId} deleteResearch={this.props.deleteResearch}/>
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <ResearchImages fetchResearchImages={this.props.fetchResearchImages} researches={this.props.researches} projectId={projectId} deleteResearch={this.props.deleteResearch}/>
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
