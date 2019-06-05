import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'semantic-ui-react'

class NewProject extends Component {

  render (){
    return (
      <>
        <Modal size="mini" trigger={<Button>Start A New Project</Button>}>
          <Form width={4}>
            <center>
            <Form.Field  inline>
              <br /><label>Project Name:</label><br /><br />
              <Input placeholder='Project Name' />
            </Form.Field>
            <Button>Start Project</Button><br />
            </center>
          </Form>
        </Modal>
      </>
    )
  }
}

export default NewProject
