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
    projectMaterials: [],
    pm: [],
    allProjects: []

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
        .then(data => this.setState({projects: data.projects, materials: data.materials}, console.log("USER ", data.projects)))
        this.setState({id: id})
      })
    }

    fetch(`http://localhost:3001/api/v1/projects`)
    .then(res => res.json())
    .then(data => this.setState({allProjects: data}))

    fetch('http://localhost:3001/api/v1/project_materials')
    .then(res => res.json())
    .then(data => this.setState({pm: data}))

  //   fetch('http://localhost:3001/api/v1/materials')
  //   .then(res => res.json())
  //   .then(data => this.setState({materials: data}))
  }

  /******************************************/
  /*               MENU BAR                */
  /******************************************/
  dropDown = (id) => {
    fetch(`http://localhost:3001/api/v1/projects/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projectMaterials: data.materials, pId: id}))
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
  /*     ADD/UPDATE/DELETE PROJECTS         */
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
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*     ADD/UPDATE/DELETE MATERIALS         */
  /******************************************/
  addMaterial = (material) => {
    this.setState({materials: [...this.state.materials, material]})
  }

  addProjectMaterial = (projectmaterial) => {
    this.setState({pm: [...this.state.pm, projectmaterial]})
  }

  fetchMaterials = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({materials: data.materials}, console.log("USER Materials", this.state.materials)))
  }
  //
  deleteMaterial = (dmaterial) => {
    const deleted = this.state.materials.find(material => material.id === dmaterial)
    console.log("item", deleted.id);
    fetch(`http://localhost:3001/api/v1/materials/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchMaterials())
  }

  fetchProjectMaterials = () => {
    let id = this.state.pId

    fetch(`http://localhost:3001/api/v1/projects/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projectMaterials: data.materials}))
  }

  deleteProjectMaterials = (pm) => {
     const deleted = this.state.projectMaterials.find(material => material.id === pm)
     console.log("pm", deleted, "project", this.state.pId, "join", this.state.pm);

     this.state.pm.find(item => {
       // console.log("test 1", item.project_id,  this.state.pId);
       // console.log("test 2", item.material_id,  deleted.id);
       if (item.project_id === this.state.pId && item.material_id === deleted.id){
         fetch(`http://localhost:3001/api/v1/project_materials/${item.id}`, {
           method: "delete"
         })
         .then(() =>this.fetchProjectMaterials())
       }
     })

  }

  /******************************************/
  /*                                        */
  /******************************************/
  render (){
    // console.log("App is rendering ", this.state);
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

    const all = this.state.allProjects.filter(project => {
      if(project.id === this.state.pId){
      return project.materials}
    })
    console.log(this.state.projectMaterials);
    return (
      <>
        <Top projects={unfinished} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/><br />
          <Route path='/Home' render={()=><Main projects={unfinished} finished={finished} materials={this.state.materials} addProject={this.addProject}
          addMaterial={this.addMaterial}
          deleteMaterial={this.deleteMaterial}
          id={this.state.id}
          fetchMaterials={this.fetchMaterials}/>}/>
          <Route path="/login" render={() => {
            return <LoginPage handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout}/>}}/> <br />
          <Route path="/gallery" render={() => {
            return <FinishedPictures projects={finished} />}} />
          <Route path="/show" render={() => {
              return <Show projects={unfinished}
               finished={finished}
               materials={this.state.materials} projectId={this.state.pId} fetchProjects={this.fetchProjects} deleteProject={this.deleteProject}
               deleteProjectMaterials={this.deleteProjectMaterials}
               projectMaterials={this.state.projectMaterials}
               fetchProjectMaterials={this.fetchProjectMaterials}
               addProjectMaterial={this.addProjectMaterial}
               allProjects={this.state.allProjects}
               />}}
               />
          <Route path="/profile" render={() => {
            return <Profile />}} />
      </>
    );
  }
}

export default withRouter(App);
