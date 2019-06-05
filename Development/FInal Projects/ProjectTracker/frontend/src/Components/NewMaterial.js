import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'semantic-ui-react'

class NewMaterial extends Component {

  render (){
    return (
      <>
        <Modal size="mini" trigger={<Button>Add A New Material</Button>}>
          <Form width={4}>
            <center>
            <Form.Field  inline>
              <br /><label>Material Name:</label><br /><br />
              <Input placeholder='Material Name' />
            </Form.Field>
            <Button>Add Material</Button><br />
            </center>
          </Form>
        </Modal>
      </>
    )
  }
}

export default NewMaterial
