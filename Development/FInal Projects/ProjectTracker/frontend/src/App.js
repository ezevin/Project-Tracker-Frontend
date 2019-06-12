import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Main from './Containers/Main'
import Top from './Components/Top'
import Login from './Components/Login'
import Signup from './Components/Signup'
import FinishedPictures from './Containers/FinishedPictures'
import Show from './Containers/Show'
import Profile from './Components/Profile'
import Footer from './Components/Footer'

class App extends Component {
  state = {
    projects: [],
    materials: [],
    pID: null,
    currentUser: null,
    id: '',
    projectMaterials: [],
    pm: [],
    allProjects: [],
    users: [],
    materialsInUse: [],
    user: [],
    research: [],
    allResearch: [],
    toDoList: [],
    notes: [],
    allToDo: [],
    allNotes:[],
    um: [],
    currentProject: [],
    unfinished: []
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
        .then(data => this.setState({projects: data.projects, materials: data.materials, user: data}, console.log("USER ", data.projects)))
        this.setState({id: id})
      })
    }

    fetch(`http://localhost:3001/api/v1/projects`)
    .then(res => res.json())
    .then(data => this.setState({allProjects: data}, console.log("PROJECTS", data)))

    fetch('http://localhost:3001/api/v1/project_materials')
    .then(res => res.json())
    .then(data => this.setState({pm: data},console.log("PM", data)))

    // fetch('http://localhost:3001/api/v1/researches')
    // .then(res => res.json())
    // .then(data => this.setState({allResearch: data},console.log("Research", data)))
    //
    // fetch('http://localhost:3001/api/v1/to_do_lists')
    // .then(res => res.json())
    // .then(data => this.setState({allToDo: data},console.log("ToDo", data)))
    //
    // fetch('http://localhost:3001/api/v1/notes')
    // .then(res => res.json())
    // .then(data => this.setState({allNotes: data},console.log("Notes", data)))

    fetch('http://localhost:3001/api/v1/user_materials')
    .then(res => res.json())
    .then(data => this.setState({um: data}, console.log("UM", data)))
  }

  /******************************************/
  /*               MENU BAR                */
  /******************************************/
  dropDown = (id) => {
    this.props.history.push(`/show/${id}`)
    fetch(`http://localhost:3001/api/v1/projects/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projectMaterials: data.materials, pId: id, researches: data.researches, toDoList: data.to_do_lists, notes: data.notes}))
    .then(this.props.history.push(`/show/${id}`))
  }
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*        LOGIN/LOGOUT/USERINFO          */
  /******************************************/
  handleUserLogin = (user) => {
    localStorage.setItem("token", user.id)
    this.setState({currentUser:user})
      this.fetchUserData()
      this.fetchProjects()
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({currentUser: null})
    this.props.history.push('login')
  }

  addUsers = user => {
    this.setState({ users: [...this.state.users, user] })
  }

  fetchUserData = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({user: data}))
  }
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*    ADD/UPDATE/DELETE/SORT PROJECTS     */
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
    .then(() =>this.fetchProjects())
  }

  handleTitleSort = () => {
    this.setState({projects: this.state.projects.sort((a,b) =>{
      return a.title.localeCompare(b.title)})})
  }
  //
  // handleDateSort = () => {
  //   this.setState({projects: this.state.projects.sort((a,b)=>{
  //
  //   console.log("Date", a.due_date)
  // })})
  // }

  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*     ADD/UPDATE/DELETE MATERIALS         */
  /******************************************/
  addMaterial = (material) => {
    this.setState({materials: [...this.state.materials, material]})
  }

  fetchMaterials = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({materials: data.materials}, console.log("USER Materials", this.state.materials)))
  }

  deleteMaterial = (dmaterial) => {
    const deleted = this.state.materials.find(material => material.id === dmaterial)
    console.log("item", deleted.id);
    fetch(`http://localhost:3001/api/v1/materials/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchMaterials())
  }
  /******************************************/
  /*                                        */
  /******************************************/

  render (){

    const unfinished = this.state.projects.filter(project => {
      if(project.finished === false){
      return project
      }
    })

    const finished = this.state.projects.filter(project => {
      if(project.finished){
      return project
      }
    })

    return (
      <>
        <Top id={this.state.id} projects={unfinished} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/><br />
        <Switch>
          <Route path='/Home' render={()=><Main projects={unfinished}
                                                finished={finished}
                                                materials={this.state.materials}
                                                addProject={this.addProject}
                                                addMaterial={this.addMaterial}
                                                deleteMaterial={this.deleteMaterial}
                                                research={this.state.allResearch}
                                                titles={this.handleTitleSort}
                                                dates={this.handleDateSort}
                                                id={this.state.id}
                                                fetchMaterials={this.fetchMaterials}
                                                dropDown={this.dropDown}
                                                toDoList={this.state.allToDo}
                                                allNotes={this.state.allNotes}
                                                um={this.state.um}/>}/>
          <Route path="/login" render={() => {
            return <Login handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
            <Route path="/signup" render={() => {
              return <Signup handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
          <Route path="/gallery/:slug" render={() => {
            return <FinishedPictures projects={finished} research={this.state.allResearch} toDoList={this.state.allToDo}   allNotes={this.state.allNotes}/>}} />
          <Route path="/show/:slug" render={(routerProps) => {
            const slug = routerProps.match.params.slug
              return <Show  slug={slug} projects={unfinished}
               finished={finished}
               materials={this.state.materials} projectId={this.state.pId} fetchProjects={this.fetchProjects} deleteProject={this.deleteProject}
               deleteProjectMaterials={this.deleteProjectMaterials}
               projectMaterials={this.state.projectMaterials}
               fetchProjectMaterials={this.fetchProjectMaterials}
               addProjectMaterial={this.addProjectMaterial}
               allProjects={this.state.allProjects}
               fetchResearchImages={this.fetchResearchImages}
               researches={this.state.researches}
               deleteResearch={this.deleteResearch}
               pm={this.state.pm}
               userId={this.state.id}
               />}}
               />
          <Route path="/profile" render={() => {
            return <Profile currentUser={this.state.currentUser} fetchUserData={this.fetchUserData} user={this.state.user} />}} />
          </Switch>
      </>
    );
  }
}

export default withRouter(App);
