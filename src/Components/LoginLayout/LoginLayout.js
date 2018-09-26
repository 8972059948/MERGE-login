import React from 'react';

import {
  Button,
  Form, 
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

import { Redirect } from 'react-router'
// import { replace } from 'react-router-redux';

import { GraphQLClient } from 'graphql-request';
import { saveUser, saveaccessToken } from '../../Redux/action';

// import { store } from '../../Redux/store';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        accessToken: ''
    };
  }

  handleEmailChange = (e) => {
    if (!e.target.value.trim()) {
      return
    }
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    if (!e.target.value.trim()) {
      return
    }
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log("Email: " + this.state.email);
    console.log("Password: " + this.state.password);
    
    window.localStorage.setItem('userEmail', this.state.email);

    // store.dispatch(saveUser(this.state.email,this.state.password));

    // console.log("Redux Store State: ",store.getState());
    // Sets the new href (URL) for the current window.
    const client = new GraphQLClient('http://localhost:4005/graphql', {
        // credentials: 'include',
        mode: 'cors'
    })
    
    const query = `query findUser($userEmail:String!) {  
        userloginDetails(userEmail:$userEmail) {
          userEmail
          userPassword
          accessToken
        }
    }`;

    const queryvariables = {
        "userEmail":`${this.state.email}`
    }

    client.request(query,queryvariables).then(data => {

        const { userloginDetails } = data;

        userloginDetails.forEach(element => {
          const { userEmail, userPassword, accessToken } = element;

          window.localStorage.setItem(accessToken,'jwt');
          this.setState({
            accessToken: accessToken
          });

          window.localStorage.setItem('accessToken', accessToken);

          // store.dispatch(saveaccessToken(accessToken));

          if( userPassword === this.state.password ) {
            console.log("E> ",userEmail," P> ",userPassword);
          } else {
            this.setState({
              password: ''
            })
          }

        });

        if((userloginDetails.length === 1 && this.state.password !== '')) {

          this.setState({
            email: '',
            password: ''
          })

          window.location.assign("http://localhost:3000/dashboard");

        } else {
          this.setState({
            email: '',
            password: ''
          })
          console.log("Invalid Login...");
        }
    })

  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form size='large' >
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                  value={this.state.email}
                  onChange={e => this.handleEmailChange(e)} />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={e => this.handlePasswordChange(e)}
                />
                <Button color='teal' fluid size='large' onClick={(e) => this.handleLogin(e)} >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='http://localhost:3000/signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm