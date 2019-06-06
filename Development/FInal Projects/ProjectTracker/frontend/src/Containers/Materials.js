import React, { Component } from 'react'
import { Header, Search, Button, Form, Popup } from 'semantic-ui-react'

import MaterialsList from '../Components/MaterialsList'

class Materials extends Component {
  state = {
    label: "",
    user_id: "",
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

  }
  render(){
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Project Name:</label>
                    <input placeholder='Title' onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Start Project</Button>
                </Form>

    return (
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Materials</Header>
        <center><Search width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center><br />
        {this.props.materials.map(material => (
          <MaterialsList key={material.id} materials={material.label}/>

        ))}<br />
        <center><center><Popup trigger={<Button content='Add A New Material' />}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center></center>
      </>
    )
  }
}

export default Materials
