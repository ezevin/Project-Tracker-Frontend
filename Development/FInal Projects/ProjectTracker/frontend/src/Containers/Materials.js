import React, { Component } from 'react'
import { Header, Search } from 'semantic-ui-react'

import MaterialsList from '../Components/MaterialsList'
import NewMaterial from '../Components/NewMaterial'

class Materials extends Component {

  render(){
    return (
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Materials</Header>
        <center><Search width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center><br />
        {this.props.materials.map(material => (
          <MaterialsList key={material.id} materials={material.label}/>

        ))}<br />
        <center><NewMaterial /></center>
      </>
    )
  }
}

export default Materials
