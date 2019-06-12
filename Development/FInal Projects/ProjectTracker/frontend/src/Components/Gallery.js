import React, { Component } from 'react'
import { Image, Modal, Header, Card, Button, Icon } from 'semantic-ui-react'

class Gallery extends Component {

  state = {
    isOpen: false,
    research: [],
    toDoList: [],
    notes: []
  }

componentDidMount(){
  fetch('http://localhost:3001/api/v1/researches')
  .then(res => res.json())
  .then(data => this.setState({research: data}))

  fetch('http://localhost:3001/api/v1/to_do_lists')
  .then(res => res.json())
  .then(data => this.setState({toDoList: data}))

  fetch('http://localhost:3001/api/v1/notes')
  .then(res => res.json())
  .then(data => this.setState({notes: data}))
}

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  render(){

    const trigger = <Card  className="gallerycard" wrapped ui={false}  color='teal' rounded fluid>
                      <Image src={this.props.finished_image}  size='medium'/>
                    </Card>

    const research = this.state.research.filter(research => {
      if(research.project_id === this.props.projectId){
        return research
      }
      })
      // console.log("&&", this.state.research);
    const process = this.state.toDoList.filter(picture => {
      if(picture.project_id === this.props.projectId){
        return picture
      }
    })

    const notes = this.state.notes.filter(note => {
      if(note.project_id === this.props.projectId){
        return note
      }
    })

    const researchCard =   <Modal open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose}
                            trigger={
                              <Button primary icon>
                                Research Images <Icon name='right chevron' />
                              </Button>} >
                              <Modal.Content image>
                               { research.map(research => {
                                return <Card key={research.id}><Image wrapped size='medium' src={research.image}  /></Card>
                               })}
                             </Modal.Content>
                               <Button align="right" icon='check' content='Back To Project Details' onClick={this.handleClose} />
                           </Modal>

    const processCard = <Modal open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose}
                            trigger={
                              <Button primary icon>
                                Process Pictures <Icon name='right chevron' />
                              </Button>} >
                              <Modal.Content image>
                               { process.map(picture => {
                                return <Card key={picture.id}><Card.Content><Card.Header>{picture.item}</Card.Header></Card.Content><Image wrapped size='medium' src={picture.process_pic} /></Card>
                               })}
                             </Modal.Content>
                               <Button align="right" icon='check' content='Back To Project Details' onClick={this.handleClose} />
                           </Modal>

      return(
        <>
          <Modal trigger={trigger}>
            <Modal.Content image>
              <Image wrapped size='medium' src={this.props.photo} />
              <Modal.Description>
                <Header>{this.props.title}</Header>
                  <Header className="scroll" as="h4">Project Notes: {notes.map(note => note.note)}</Header>
                <Header as="h4">Materials: {this.props.details}</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {researchCard}
              {processCard}
            </Modal.Actions>
          </Modal><br />
        </>
    )
  }
}

export default Gallery
