import React from 'react';
import {
  Button,
  Form, 
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Checkbox,
  Confirm
} from 'semantic-ui-react';

import { GraphQLClient } from 'graphql-request';

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password1: '',
        password2: '',
        data: '',
        userexist: false
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

  handlePasswordChange1 = (e) => {
    if (!e.target.value.trim()) {
      return
    }
    this.setState({
      password1: e.target.value
    });
  };

  handlePasswordChange2 = (e) => {
    if (!e.target.value.trim()) {
      return
    }
    this.setState({
      password2: e.target.value
    });
  };

  handleSignUp = (e) => {
    e.preventDefault();

    console.log("EMail: " + this.state.email);
    console.log("Password1: " + this.state.password1);
    console.log("Password2: " + this.state.password2);

    if((this.state.password1 !== '' || this.state.password1 !== '' ) &&
             (this.state.password1 === this.state.password2)) {
            
            const client = new GraphQLClient('http://localhost:4005/graphql', {
                // credentials: 'include',
                mode: 'cors'
            })

            const query = `query findUser($userEmail:String!){  
                userloginDetails(userEmail:$userEmail) {
                  userEmail
                  userPassword
                }
            }`;

            const queryvariables = {
                "userEmail":`${this.state.email}`
            }

            client.request(query,queryvariables).then(data => {
                if(data !== null) {
                    this.setState({
                        userexist: true
                    })
                };
            })

            const mutation = `mutation saveUser($InputDoL: logindetails) {
                login(InputDoL: $InputDoL) {
                  userEmail
                  userPassword
                }
            }`;

            const variables = {
                InputDoL: {
                    "userEmail":`${this.state.email}`,
                    "userPassword":`${this.state.password1}`
                }
            }

            // Request for Data to Graphql Server...
            if(this.state.userexist) {
                
                client.request(mutation,variables).then(signupdata => {
                    this.setState({
                        data: signupdata
                    })
                })

                if( this.state.data !== 'undefined' || this.state.data !== '' ) {
                    this.setState({email: '',password1: '',password2: '', data: ''});
                    window.location.href = "http://localhost:3000/signupsuccess";
                }

            } else {
                this.setState({
                    email: '',
                    password1: '',
                    password2: '',
                    data: '',
                    userexist:false
                });
                console.log('Already Exist!!! ');
            }

    } else {
        window.location.href = "http://localhost:3000/signuperror";
    }
  };

  open = () => this.setState({ userexist: true })
  close = () =>  this.setState({ userexist: false })

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
                  value={this.state.password1}
                  onChange={e => this.handlePasswordChange1(e)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Re-Enter Password'
                  type='password'
                  value={this.state.password2}
                  onChange={e => this.handlePasswordChange2(e)}
                />
                {/* <Form.Field fluid size='large'>
                  <Checkbox fluid label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Form.Field fluid control={Checkbox} label={{ children: 'I agree to the Terms and Conditions' }} /> */}
                <Button color='teal' fluid size='large' onClick={(e) => this.handleSignUp(e)} >
                  SignUp
                </Button>
                {/* <Confirm open={this.state.userexist}
                 header='This User Already Exist'
                 onCancel={this.close} onConfirm={this.close} /> */}
              </Segment>
            </Form>
            <Message>
                Register Users? <a href='http://localhost:3000/login'>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignUpForm