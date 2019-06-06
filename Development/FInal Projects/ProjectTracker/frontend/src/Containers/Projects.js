import React, { Component } from 'react'
import { Header, Button, Popup, Form } from 'semantic-ui-react'

import ProjectList from '../Components/ProjectList'


class Projects extends Component {
  state = {
    title: "",
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

  handleSubmit= (e) => {
    const { title } = this.state

    fetch('http://localhost:3001/api/v1/projects', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            title, user_id:this.props.id
           })
        })
        .then(res=>res.json())
        .then(data => {this.props.addProject(data)})
        this.setState({isOpen: false})
  }

  render(){
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Project Name:</label>
                    <input placeholder='Title' onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Start Project</Button>
                </Form>

    return(
      <div>
        <Header inverted color='grey' textAlign="center" as='h2'>Current Projects</Header>
        {this.props.projects.map(project =>(
          <ProjectList key={project.id} project={project.title} projects={this.props.projects}/>
          ))
        }
        <center><Popup trigger={<Button content='Start A New Project' />}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center>
      </div>
    )
  }
}


export default Projects
