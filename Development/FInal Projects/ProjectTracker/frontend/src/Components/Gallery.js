import React, { Component } from 'react'
import { Header, Grid, Image, Container } from 'semantic-ui-react'


class Gallery extends Component {
  render(){
    return(
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        <Container>
          <Grid relaxed columns={5}>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium'/>
            </Grid.Column>
            <Grid.Column>
              <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default Gallery
