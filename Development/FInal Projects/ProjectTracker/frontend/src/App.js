import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Main from './Containers/Main'
import Top from './Components/Top'
import LoginPage from './Containers/LoginPage'
import FinishedPictures from './Containers/FinishedPictures'
import Show from './Containers/Show'
import Profile from './Components/Profile'

class App extends Component {
  state = {
    projects: [],
    materials: [],
    pID: null,
    currentUser: null,
    id: '',

  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    // console.log("token is", token);
    if(token){
      fetch('http://localhost:3001/api/v1/current_user', {
        headers: {
          Authenticate: token
        }
      })
      .then(res => res.json())
      .then((user) => {
        if (!user.error){
          this.setState({currentUser: user})
        }
        let id = this.state.currentUser.id
        fetch(`http://localhost:3001/api/v1/users/${id}`)
        .then(res => res.json())
        .then(data => this.setState({projects: data.projects}, console.log("USER PROJECTS", this.state.projects)))
        this.setState({id: id})
      })
    }

    // fetch('http://localhost:3001/api/v1/projects')
    // .then(res => res.json())
    // .then(data => this.setState({projects: data}))

    fetch('http://localhost:3001/api/v1/materials')
    .then(res => res.json())
    .then(data => this.setState({materials: data}))
  }

  /******************************************/
  /*               MENU BAR                */
  /******************************************/
  dropDown = (id) => {
    this.setState({pId: id})
  }
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*            LOGIN/LOGOUT                */
  /******************************************/
  handleUserLogin = (user) => {
    localStorage.setItem("token", user.id)
    this.setState({currentUser:user})
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
    this.props.history.push('login')
  }
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*          ADD/UPDATE/DELETE PROJECTS           */
  /******************************************/
  addProject = (project) => {
    this.setState({projects: [...this.state.projects, project]})
  }

  fetchProjects = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projects: data.projects}, console.log("USER PROJECTS", this.state.projects)))
    this.setState({id: id})
  }

  deleteProject = (dproject) => {
    const deleted = this.state.projects.find(project => project.id === dproject)
    fetch(`http://localhost:3001/api/v1/projects/${deleted.id}`, {
      method:"delete"
    })
    .then(this.props.history.push('home'))
    .then(() => this.fetchProjects())
  }
  /******************************************/
  /*                                        */
  /******************************************/

  render (){
    // console.log("App is rendering ", this.state);
    console.log(this.state.id);
    return (
      <>
        <Top projects={this.state.projects} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/><br />
          <Route path='/Home' render={()=><Main projects={this.state.projects} materials={this.state.materials} addProject={this.addProject} id={this.state.id}/>}/>
          <Route path="/login" render={() => {
            return <LoginPage handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout}/>}}/> <br />
          <Route path="/gallery" render={() => {
            return <FinishedPictures projects={this.state.projects} />}} />
          <Route path="/show" render={() => {
              return <Show projects={this.state.projects} materials={this.state.materials} projectId={this.state.pId} fetchProjects={this.fetchProjects} deleteProject={this.deleteProject}/>}} />
          <Route path="/profile" render={() => {
            return <Profile />}} />
      </>
    );
  }
}

export default withRouter(App);
