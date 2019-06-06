import React, { Component } from 'react';
import { Header, Form, Button, Popup, Icon } from 'semantic-ui-react'

class HeadShow extends Component {

  state = {
    title: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleSubmit = (e) => {
    const { title } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ title })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        this.setState({isOpen: false})
  }
  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>New Title:</label>
                    <input placeholder={this.props.title} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
    return (
        <Header inverted color='grey' textAlign='center' as='h1'>{this.props.title}
          <Popup
            content={form}
            trigger={<Icon size="mini" name='add' />}
            on='click'
            position='bottom right'
            open={this.state.isOpen}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
          />
        </Header>
    )
  }
}

export default HeadShow
