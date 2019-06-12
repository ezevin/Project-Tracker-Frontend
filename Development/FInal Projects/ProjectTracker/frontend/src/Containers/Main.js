import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Grid, Container } from 'semantic-ui-react'

import Projects from './Projects'
import MainGallery from './MainGallery'
import Materials from './Materials'

class Main extends Component {
  state = {
    search: '',
    psearch: '',
    research: [],
    toDoList: [],
    allNotes: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(!token){
      this.props.history.push('login')
    }else {
      fetch('http://localhost:3001/api/v1/researches')
      .then(res => res.json())
      .then(data => this.setState({allResearch: data}))

      fetch('http://localhost:3001/api/v1/to_do_lists')
      .then(res => res.json())
      .then(data => this.setState({allToDo: data}))

      fetch('http://localhost:3001/api/v1/notes')
      .then(res => res.json())
      .then(data => this.setState({allNotes: data}))
    }
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    console.log(value)
  }

  handlePSearch = (e, {value}) => {
    this.setState({psearch: value})
    console.log(value)
  }



  render(){

    const filteredMaterials = this.props.materials.filter(material =>{
      // console.log(material.label);
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

    const filteredProjects = this.props.projects.filter(project =>{
      return project.title.toLowerCase().includes(this.state.psearch.toLowerCase())
    })

    return (
      <>
        <br />
        <Grid className="look container">
          <Grid.Column className="look" floated='left' width={8}>
            <Projects
              slug={this.props.slug}
              projects={filteredProjects}
              addProject={this.props.addProject}
              handleSearch={this.handlePSearch}
              titles={this.props.titles}
              dates={this.props.dates}
              id={this.props.id}
              dropDown={this.props.dropDown}
            />
          </Grid.Column>
          <Grid.Column floated="right" width={8}>
            <Materials materials={filteredMaterials}
             addMaterial={this.props.addMaterial}
             id={this.props.id}
             handleSearch={this.handleSearch}
             deleteMaterial={this.props.deleteMaterial}
             fetchMaterials={this.props.fetchMaterials}
             um={this.props.um}
            />
          </Grid.Column>
        </Grid>
        <Container className="look container">
          <MainGallery projects={this.props.finished} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.allNotes}/>
        </Container>
      </>
    )
  }
}

export default withRouter(Main)
