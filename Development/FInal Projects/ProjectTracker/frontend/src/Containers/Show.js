import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Header, Grid, Button, Divider, Checkbox } from 'semantic-ui-react'

import Materials from './Materials'
import FinishedPictures from '../Components/FinishedPictures'


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
            <Header inverted color='grey' textAlign='center' as='h1'>{project.title}</Header><br />
            <Grid>
              <Grid.Row>
                <Grid.Column width={6} floated='left'>Date Started: {project.created_at.slice(0, 10)}</Grid.Column>
                <Grid.Column width={5}><Button>I've Finished!</Button></Grid.Column>
                <Grid.Column width={3} floated='right'>Date Due: 00/00/0000</Grid.Column>
              </Grid.Row>
              <Grid.Column width={6} floated='left'>Budget: ${project.budget}</Grid.Column>
              <Grid.Column width={3} floated='right'>Remaining Budget: $</Grid.Column>
            </Grid>
            <Divider inverted/>
            <br />
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Header inverted color='grey' textAlign='center' as='h3'>Notes:</Header><br />
                </Grid.Column>
                <Grid.Column  width={6}>
                  <Header inverted color='grey' textAlign='center' as='h3'>To Do List:</Header><br />
                  <Checkbox color="white" label='Make my profile visible' />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Materials materials={filteredMaterials} handleSearch={this.handleSearch}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <FinishedPictures />
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <FinishedPictures />
                </Grid.Column>
              </Grid>
            </div>
      )}else {
        return <Link to="/home" />
      }

    }))
  }
}

export default Show
