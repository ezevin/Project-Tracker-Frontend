import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Main from './Containers/Main'
import Top from './Components/Top'
import Login from './Components/Login'
import Signup from './Components/Signup'
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
    allProjects: [],
    users: [],
    materialsInUse: [],
    user: [],
    research: [],
    allResearch: []
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

    fetch('http://localhost:3001/api/v1/researches')
    .then(res => res.json())
    .then(data => this.setState({allResearch: data},console.log("Research", data)))

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
    .then(data => this.setState({projectMaterials: data.materials, pId: id, researches: data.researches}, console.log(data.researches)))

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

  handleDateSort = () => {
    this.setState({projects: this.state.projects.sort((a,b)=>{
      return b.due_date - a.due_date
    })})
  }

  handleUnfinished = () => {
    this.state.projects.filter(project => {
      if(project.finished === false){
      this.setState({unfinished: project})
      }
    })
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
    // .then(()=> this.fetchProjectMaterials())
  }

  deleteProjectMaterials = (pm) => {
     const deleted = this.state.projectMaterials.find(material => material.id === pm)
     console.log("pm", deleted, "project", this.state.pId, "join", this.state.pm);

     this.state.pm.find(item => {
       console.log("test 1", item.project_id,  this.state.pId);
       console.log("test 2", item.material_id,  deleted.id);
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

  /******************************************/
  /*           Research Images              */
  /******************************************/

  fetchResearchImages = () => {
    let id = this.state.pId

    fetch(`http://localhost:3001/api/v1/projects/${id}`)
    .then(res => res.json())
    .then(data => this.setState({researches: data.researches}))
  }

  deleteResearch = (item) => {
    console.log("???", item);
    const deleted = this.state.researches.find(research => research.id === item)
    console.log("item", deleted);
    fetch(`http://localhost:3001/api/v1/researches/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchResearchImages())
  }

  /******************************************/
  /*                                        */
  /******************************************/
  render (){

    console.log("what?", this.state.user);
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


    // const all = this.state.allProjects.filter(project => {
    //   if(project.id === this.state.pId){
    //   return project.materials}
    // })
    console.log(this.state.projectMaterials);
    return (
      <>
        <Top projects={unfinished} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/><br />
          <Route path='/Home' render={()=><Main projects={unfinished}
                                                finished={finished}
                                                materials={this.state.materials}
                                                addProject={this.addProject}
                                                addMaterial={this.addMaterial}
                                                deleteMaterial={this.deleteMaterial}
                                                titles={this.handleTitleSort}
                                                dates={this.handleDateSort}
                                                id={this.state.id}
                                                fetchMaterials={this.fetchMaterials}/>}/>
          <Route path="/login" render={() => {
            return <Login handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
            <Route path="/signup" render={() => {
              return <Signup handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
          <Route path="/gallery" render={() => {
            return <FinishedPictures projects={finished} research={this.state.allResearch}/>}} />
          <Route path="/show" render={() => {
              return <Show projects={unfinished}
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
               />}}
               />
          <Route path="/profile" render={() => {
            return <Profile currentUser={this.state.currentUser} fetchUserData={this.fetchUserData} user={this.state.user} />}} />

      </>
    );
  }
}

export default withRouter(App);
