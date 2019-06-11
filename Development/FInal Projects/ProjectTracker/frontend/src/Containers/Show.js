import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Header, Grid, Button, Divider } from 'semantic-ui-react'

import ProjectMaterials from './ProjectMaterials'
import StartDate from '../Forms/StartDate'
import Budget from '../Forms/Budget'
import DueDate from '../Forms/DueDate'
import ProjectDeets from '../Forms/ProjectDeets'
import Notes from './Notes'
import Finished from '../Forms/Finished'
import Title from '../Forms/Title'
import ResearchImages from './ResearchImages'
import ProcessPics from './ProcessPics'
import ToDo from './ToDo'


class Show extends Component {
  state = {
    search: '',
    projects: [],
    researches: [],
    toDoList: [],
    projectMaterials: [],
    notes: []
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    // console.log(value)
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/projects/${this.props.slug}`)
    .then(res => res.json())
    .then(data => this.setState({projects: data, researches: data.researches, toDoList: data.to_do_lists, projectMaterials: data.materials, notes: data.notes}))

  }

  render(){
    // debugger
    console.log(this.props);
    const { id, title, details, start_date, due_date, finished, budget } = this.state.projects

    // const id = this.props.pm.map(pm => pm.material_id)
    const prices = this.state.projectMaterials.map(material => {
      // if(material.id === id){
      //   console.log(material.id, id);
        return material.price
       // }
    })
    const total = prices.reduce((a,b) => a+b, 0)
    // const id = this.props.projectMaterials.map(material => material.id)

    // console.log(prices);
    const { projectId, projectMaterials } = this.props
    const filteredMaterials = this.state.projectMaterials.filter(material =>{
      // console.log(material.label);
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })


      // if(project.id === this.props.slug){
        console.log("OKAY");
        return (
          <div key={id}>
              <Header inverted color='grey' textAlign='center' as='h1'>{title}
                <Title id={id} title={title} fetchProjects={this.props.fetchProjects}/>
              </Header>
              <Header  inverted color='grey' textAlign='center' as="h3">Summary: {details}<ProjectDeets id={id} details={details} fetchProjects={this.props.fetchProjects}/></Header>

            <Grid padded>
              <Grid.Row>
                <Grid.Column width={6} floated='left'>Date Started: {start_date}
                  <StartDate id={id} start_date={start_date} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={5}>
                  <Finished projectId={id} finished={finished} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={3} floated='right'>Date Due: {due_date}
                  <DueDate id={id} due_date={due_date} fetchProjects={this.props.fetchProjects}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Column width={6} floated='left'>Budget: ${budget}
                <Budget id={id} budget={budget} fetchProjects={this.props.fetchProjects}/>
              </Grid.Column>

              <Grid.Column width={3} floated='right'>Remaining Budget: ${budget - (total )}</Grid.Column>
            </Grid>

            <Divider inverted/>
            <br />

              <Grid padded>
                <Grid.Column floated='left' width={5}>
                  <Notes notes={this.state.notes} fetchNotes={this.props.fetchNotes} deleteNote={this.props.deleteNote} projectId={projectId}/>
                </Grid.Column>

                <Grid.Column  width={6}>
                  <ToDo fetchToDoList={this.props.fetchToDoList} toDoList={this.state.toDoList} projectId={projectId} deleteToDo={this.props.deleteToDo}/>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <ProjectMaterials
                    id={id}
                    materials={filteredMaterials}
                    handleSearch={this.handleSearch}
                    allMaterials={this.props.materials}
                    fetchProjectMaterials={this.props.fetchProjectMaterials}
                    addProjectMaterial={this.props.addProjectMaterial}
                    deleteMaterial={this.props.deleteProjectMaterials}
                    pm={this.props.pm}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <ResearchImages fetchResearchImages={this.props.fetchResearchImages} researches={this.state.researches} projectId={projectId} deleteResearch={this.props.deleteResearch}/>
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <ProcessPics fetchToDoList={this.props.fetchToDoList} toDoList={this.state.toDoList} projectId={projectId} />
                </Grid.Column>
              </Grid>
              <Button onClick={()=> this.props.deleteProject(id)}>Delete Project</Button>
            </div>
      )
      // else {
        // return this.props.history.push("home")
      // }

  }
}

export default withRouter(Show)







// <Finished id={project.id} fetchProjects={this.props.fetchProjects} finished={project.finished}/>
