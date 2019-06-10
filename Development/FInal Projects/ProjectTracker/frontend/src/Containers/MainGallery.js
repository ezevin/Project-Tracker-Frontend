import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

class MainGallery extends Component {


  render(){

    return(
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        <Grid columns={5} padded className="cards ">
          {this.props.projects.map(project =>(
             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research}/>
          ))}
        </Grid>
      </>
    )
  }
}

export default MainGallery
