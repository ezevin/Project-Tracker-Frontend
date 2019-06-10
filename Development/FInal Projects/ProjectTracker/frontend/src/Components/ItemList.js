import React, { Component } from 'react'
import { Icon, Grid, List } from 'semantic-ui-react'

import AddProcess from '../Forms/AddProcess'

class ItemList extends Component {

  render (){

      const todoClass = this.props.complete ?
          "done" : "undone";

      return(
        <>
       <List divided inverted relaxed className={todoClass}>
        <List.Item>
          <List.Content>
            <Grid>
              <Grid.Column width={3}>
                <Icon name="check" onClick={()=> this.props.handleDone(this.props.id)}/>
              </Grid.Column>
              <Grid.Column width={10}>
               {this.props.item}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <AddProcess toDoList={this.props.toDoList} process_pics={this.props.pics} id={this.props.id} fetchToDoList={this.props.fetchToDoList}/>
               <Icon name="delete"  onClick={()=> this.props.deleteToDo(this.props.id)}/>
             </Grid.Column>
            </Grid>
          </List.Content>
        </List.Item>
       </List><br />

       </>

    )
  }
}

export default ItemList
