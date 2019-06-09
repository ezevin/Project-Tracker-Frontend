import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class Name extends Component {

  state = {
    name: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ name })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchUserData())
        this.setState({isOpen: false})
  }
  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Name:</label>
                    <input placeholder={this.props.name} onChange={this.handleChange}/>
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

export default Name
