import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import ProcessList from '../Components/ProcessList'

class ProcessPics extends Component {

    render(){
      console.log("what?", this.props.pics);
      // const pictures = this.props.toDoList.filter(pic => {
      //   if(!pic.process_pic.includes("https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg")){
      //     return pic
      //   }
      // })
      // const pic = pictures.map(pic => pic.process_pic)
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
