import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
// import { store } from '../../Redux/store';

class Dashboard extends Component {

  handleLogout = (e) => {
    window.localStorage.clear()
    // window.sessionstorage.clear()
    window.location.href = "http://localhost:3000/login";
  }

  render() {
    // window.localStorage.clear()
    // console.log("Dashboard Redux State: ",store.getState())
    
    let accessToken  = window.localStorage.getItem('accessToken');
    let loggedInAs = window.localStorage.getItem('userEmail');

    console.log("Dashboard API AccessToken: ",accessToken);

    if(window.localStorage.getItem(accessToken)) {
        return (
            <div className="App">
                Welcome to your Dashboard Mr. { loggedInAs } !!! 
                <Button color='teal' fluid size='large' onClick={(e) => this.handleLogout(e)} >
                  Logout
                </Button>
            </div>
        );
    } else {
      window.localStorage.clear();
      window.location.href = "http://localhost:3000/login";
    }
  }
}

export default Dashboard;
