import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button} from 'semantic-ui-react'

const initialState = {
  error: false,
  fields: {
    username: '',
    password: ''
  }
}

class Login extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.fields);
    fetch('http://localhost:3001/api/v1/auth', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state.fields)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error){
        this.setState({error: true})
      } else {
        this.props.handleUserLogin(data)
        this.props.history.push("/bookshelf")
        // console.log("data from api", data);
      }
    })
  };

  onClick = () => {
    this.setState({login: false})
  }

  render() {
    console.log('Login props', this.props);
    const { fields } = this.state
     return (
      <div>
        <div className="ui form error">
          {
            this.state.error &&
            <div className="ui error message">
              Try Again
            </div>
          }
          <center>
            <Form inverted size='large' onSubmit={this.handleSubmit}>
               <Form.Group widths='equal'>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  name="username"
                  value={fields.username}
                  placeholder='username'
                  label='Username:'
                  onChange={this.handleChange}/>
                <Form.Input
                  fluid icon='lock'
                  name="password"
                  type="password"
                  iconPosition='left'
                  label='Password:'
                  placeholder='password'
                  value={fields.password}
                  onChange={this.handleChange}/>
               </Form.Group>
               <Button.Group>
               <Button color='black' >Login</Button>
               <Button.Or />
               <Button color='blue' onClick={this.props.toggleClick}> Create An Account</Button>
               </Button.Group>
              </Form>
         </center>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
