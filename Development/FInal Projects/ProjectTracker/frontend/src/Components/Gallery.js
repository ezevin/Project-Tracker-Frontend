import React, { Component } from 'react'
import { Image, Container, Modal, Header } from 'semantic-ui-react'


class Gallery extends Component {
  render(){
    console.log(this.props);
      return(
        <>
          <Container>
            <Modal trigger={<Image src={this.props.photo} size='medium'/>}>
              <Modal.Content image>
                <Image wrapped size='medium' src={this.props.photo} />
                <Modal.Description>
                  <Header>{this.props.title}</Header>
                  <Header as="h4">Project Notes: {this.props.details}</Header>
                  <Header as="h4">Task List: {this.props.details}</Header>
                  <Header as="h4">Materials: {this.props.details}</Header>
                </Modal.Description>
              </Modal.Content>
            </Modal><br />
          </Container>
        </>
    )
  }
}

export default Gallery
