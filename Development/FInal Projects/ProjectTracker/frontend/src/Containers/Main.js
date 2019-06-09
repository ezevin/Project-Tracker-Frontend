import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Projects from './Projects'
import FinishedPictures from './FinishedPictures'
import Materials from './Materials'

class Main extends Component {
  state = {
    search: ''
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    console.log(value)
  }

  render(){

    const filteredMaterials = this.props.materials.filter(material =>{
      // console.log(material.label);
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

    return (

      <>
        <br />
        <Grid>
          <Grid.Column floated='left' width={5}>
            <Projects
              projects={this.props.projects}
              addProject={this.props.addProject}
              id={this.props.id}
            />
          </Grid.Column>
          <Grid.Column  width={6}>
            <FinishedPictures projects={this.props.finished}/>
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
