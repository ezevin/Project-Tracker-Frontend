import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Projects from './Projects'
import MainGallery from './MainGallery'
import Materials from './Materials'

class Main extends Component {
  state = {
    search: '',
    psearch: ''
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
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Projects
              projects={filteredProjects}
              addProject={this.props.addProject}
              handleSearch={this.handlePSearch}
              titles={this.props.titles}
              dates={this.props.dates}
              id={this.props.id}
              dropDown={this.props.dropDown}
            />
          </Grid.Column>
          <Grid.Column  width={6}>
            <MainGallery projects={this.props.finished} research={this.props.research}/>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Materials materials={filteredMaterials}
             addMaterial={this.props.addMaterial}
             id={this.props.id}
             handleSearch={this.handleSearch}
             deleteMaterial={this.props.deleteMaterial}
             fetchMaterials={this.props.fetchMaterials}
            />
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default Main
