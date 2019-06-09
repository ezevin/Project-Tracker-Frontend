import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

class FinishedPictures extends Component {
  render(){
    return(
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        <Grid relaxed columns={5}>
          <Grid.Column>
          {this.props.projects.map(project =>(

             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image}/>
          ))}
          </Grid.Column>
        </Grid>
      </>
    )
  }
}

export default FinishedPictures
