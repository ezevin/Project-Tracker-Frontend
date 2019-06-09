import React, { Component } from 'react'
import { Image, Modal, Header, Card, Button, Icon } from 'semantic-ui-react'

class Gallery extends Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }
  render(){

    const trigger = <Card color='teal' fluid>
                      <Image src={this.props.photo}  size='medium'/>
                    </Card>
    const research = this.props.research.filter(research => {
      if(research.project_id === this.props.projectId){
        return research
      }
      })

    console.log(research);
    const researchCard =   <Modal open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose}
                            trigger={
                              <Button primary icon>
                                Research Images <Icon name='right chevron' />
                              </Button>} >
                              <Modal.Content image>
                               { research.map(research => {
                                return <Image wrapped size='medium' src={research.image} />
                               })}
                             </Modal.Content>
                               <Button align="right" icon='check' content='Back To Project Details' onClick={this.handleClose} />
                           </Modal>

    console.log(this.props.research);
      return(
        <>
          <Modal trigger={trigger}>
            <Modal.Content image>
              <Image wrapped size='medium' src={this.props.photo} />
              <Modal.Description>
                <Header>{this.props.title}</Header>
                <Header as="h4">Project Notes: {this.props.details}</Header>
                <Header as="h4">Task List: {this.props.details}</Header>
                <Header as="h4">Materials: {this.props.details}</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {researchCard}
            </Modal.Actions>
          </Modal><br />
        </>
    )
  }
}

export default Gallery
