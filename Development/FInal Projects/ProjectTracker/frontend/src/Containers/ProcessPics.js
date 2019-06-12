import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import ProcessList from '../Components/ProcessList'

class ProcessPics extends Component {

    render(){
    
      return(
        <>
          <Header inverted color='grey' textAlign="center" as='h2'>Process Pictures</Header>
          <Grid columns={5} padded className="cards ">
            {this.props.toDoList.map(pic =>(
               <ProcessList key={pic.id} photo={pic.process_pic} title={pic.title} details={pic.details} finished_image={pic.finished_image} picId={pic.id} research={this.props.research}/>
            ))}
          </Grid>
        </>
      )
    }
}

export default ProcessPics
