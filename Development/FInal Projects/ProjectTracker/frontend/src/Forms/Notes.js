import React, { Component } from 'react';
import { Form, Button, Popup, Icon, TextArea } from 'semantic-ui-react'

class Notes extends Component {

  state = {
    details: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({details: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { details } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ details })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchProjects())
        this.setState({isOpen: false})
  }
  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Add A Note:</label>
                    <TextArea value={this.props.details} onChange={this.handleChange} />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Icon size="small" name='add' />}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Notes
