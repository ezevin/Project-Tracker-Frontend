import React, { Component } from 'react'
import { Container, List } from 'semantic-ui-react'

class MaterialsList extends Component {

  render(){
    return (
      <Container>
        <List bulleted>
          <List.Item><h4>{this.props.materials}</h4></List.Item>
        </List>
      </Container>
    )
  }
}

export default MaterialsList
