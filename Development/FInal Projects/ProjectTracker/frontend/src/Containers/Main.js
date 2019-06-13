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
    allNotes: [],
    finished: []
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

  handleTitleSort = () => {
    this.setState({projects: this.props.projects.sort((a,b) =>{
      return a.title.localeCompare(b.title)})})
  }

  render(){

    // console.log(this.props);
    // const date = this.props.projects.map(project => project.updated_at.split("").splice(0, 10).join())
    //
    // const date1 = date.map(day => {
    //   if(day !== NaN){
    //     return day
    //   }
    // })

    const day = this.props.projects.map(project => project.updated_at.split("").splice(8, 2).join())
    const month = this.props.projects.map(project => project.updated_at.split("").splice(5, 2).join())
    const year = this.props.projects.map(project => project.updated_at.split("").splice(0, 4).join())
    // const date = []
    // date.push(day, month, year)
    // const sorted = date.map(date )
    console.log("day", day[0], "month", month[0], "year", year[0], "date")

    const filteredMaterials = this.props.materials.filter(material =>{
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
              titles={this.handleTitleSort}
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
