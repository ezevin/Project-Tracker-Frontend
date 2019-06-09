import React, { Component } from 'react'
import { Container, List, Grid, Label, Popup, Card, Button, Image, Modal, Header, Form } from 'semantic-ui-react'

import Item from '../Forms/Item'
import ItemImage from '../Forms/ItemImage'
import Price from '../Forms/Price'
import Quantity from '../Forms/Quantity'
import Details from '../Forms/Details'
import Place from '../Forms/Place'

class ProjectMaterialInfo extends Component {

  render(){

    return (
      <Modal size="mini" trigger={<Button>Info</Button>}>
        <Header as="h3">{this.props.label}</Header><br />
        <Image
          className="box"
          floated='right'
          size='mini'
          src={this.props.image_url}>
        </Image>
        <Header as="h4">Price:{this.props.price}</Header>
        <Header as="h4">Quantity:{this.props.quantity}</Header>
        <Header as="h4">Details: {this.props.description}</Header>
        <Header as="h4">Place Purchased: {this.props.place_purchased}</Header>
      </Modal>
    )
  }
}

export default ProjectMaterialInfo
