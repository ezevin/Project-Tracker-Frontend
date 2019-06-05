import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Main from './Containers/Main'
import Top from './Components/Top'
import LoginPage from './Containers/LoginPage'
import Gallery from './Components/Gallery'
import Show from './Containers/Show'

class App extends Component {
  state = {
    projects: [],
    materials: [],
    pID: null
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/v1/projects')
    .then(res => res.json())
    .then(data => this.setState({projects: data}))

    fetch('http://localhost:3001/api/v1/materials')
    .then(res => res.json())
    .then(data => this.setState({materials: data}))
  }

  dropDown = (id) => {
    this.setState({pId: id})
  }
  render (){
    return (
      <>
        <Top projects={this.state.projects} dropDown={this.dropDown}/><br />
        <Route path='/Home' render={()=><Main projects={this.state.projects} materials={this.state.materials}/>}/>
        <Route path="/login" render={() => {
          return <LoginPage />}}/> <br />
        <Route path="/gallery" render={() => {
          return <Gallery />}} />
        <Route path="/show" render={() => {
            return <Show projects={this.state.projects} materials={this.state.materials} projectId={this.state.pId}/>}} />

      </>
    );
  }
}

export default App;
