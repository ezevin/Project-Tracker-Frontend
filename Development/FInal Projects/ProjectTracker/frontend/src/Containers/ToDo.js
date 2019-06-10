import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { } from 'react-router-dom'
import { Header, Grid, Button, Form } from 'semantic-ui-react'

import ItemList from '../Components/ItemList'

class ToDo extends Component {
  state = {
    complete: false,
    item: ""
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({item: e.target.value})
  }
  //
  handleSubmit = (e) => {
    e.preventDefault()

    const { item } = this.state

    fetch(`http://localhost:3001/api/v1/to_do_lists`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ item: item, project_id: this.props.projectId})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchToDoList())
  }

  handleDone = (id) => {
    console.log("complete", id);
    fetch(`http://localhost:3001/api/v1/to_do_lists/${id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ complete: !this.state.complete})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchToDoList())
  }

  render(){


    return(
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>To Do List:</Header>
        <center>
          <Form inverted onSubmit={this.handleSubmit}>
            <center>
              <Grid>
                <Grid.Column width={8}>
                  <Form.Input  placeholder="Add A New ToDo" onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column>
                  <Button type="submit">Add</Button>
                </Grid.Column>
              </Grid>
            </center>
          </Form>
        </center><br />
        <Grid columns={5} padded className="link cards ">
          {this.props.toDoList.map(list =>(
             <ItemList key={list.id} list={list} toDoList={this.props.toDoList} id={list.id} complete={list.complete} item={list.item} deleteToDo={this.props.deleteToDo} handleDone={this.handleDone}/>
          ))}
        </Grid>
      </>
    )
  }
}

export default ToDo
