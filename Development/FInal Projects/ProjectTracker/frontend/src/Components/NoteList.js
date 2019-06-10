import React, { Component } from 'react'
import { Icon, Grid, List } from 'semantic-ui-react'

import NoteUpdate from '../Forms/NoteUpdate'

class NoteList extends Component {

  render (){

      return(
        <>
       <List divided inverted relaxed >
        <List.Item>
          <List.Content>
            <Grid>
              <Grid.Column width={3}>
                <NoteUpdate note={this.props.note} fetchNotes={this.props.fetchNotes} id={this.props.id} projectId={this.props.projectId}/>
              </Grid.Column>
              <Grid.Column width={10}>
               {this.props.note}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
              
               <Icon name="delete"  onClick={()=> this.props.deleteNote(this.props.id)}/>
             </Grid.Column>
            </Grid>
          </List.Content>
        </List.Item>
       </List><br />

       </>

    )
  }
}

export default NoteList
