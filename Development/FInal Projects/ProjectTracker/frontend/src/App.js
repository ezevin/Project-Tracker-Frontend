import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
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
    currentUser: null
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
      })
    }

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

  handleUserLogin = (user) => {
    localStorage.setItem("token", user.id)
    this.setState({currentUser:user})
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
    this.props.history.push('login')
  }
  render (){
    // console.log("App is rendering ", this.state);
    return (
      <>
        <Top projects={this.state.projects} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/><br />
          <Route path='/Home' render={()=><Main projects={this.state.projects} materials={this.state.materials}/>}/>
          <Route path="/login" render={() => {
            return <LoginPage handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout}/>}}/> <br />
          <Route path="/gallery" render={() => {
            return <FinishedPictures projects={this.state.projects} />}} />
          <Route path="/show" render={() => {
              return <Show projects={this.state.projects} materials={this.state.materials} projectId={this.state.pId}/>}} />
          <Route path="/profile" render={() => {
            return <Profile />}} />
      </>
    );
  }
}

export default withRouter(App);
