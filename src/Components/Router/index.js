import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router  } from 'react-router-dom';
import App from '../App/App';
import LoginLayout from '../LoginLayout/LoginLayout';
import DashBoard from '../Dashboard/Dashboard';
import SignUp from '../SignUp/SignUp';
import SignUpSuccess from '../SignUpResult/SignUpSuccess';
import SignUpError from '../SignUpResult/SignUpError';

class Root extends Component {
    render() {
        return (
            <div>
                <BrowserRouter basename='/'>
                    <Switch>
                        <Route exact path="/"           component={ App }/>
                        <Route path="/login"            component={ LoginLayout }/>
                        <Route path="/dashboard"        component={ DashBoard }/>
                        <Route path="/signup"           component={ SignUp }/>
                        <Route path="/signupsuccess"    component={ SignUpSuccess }/>
                        <Route path="/signuperror"      component={ SignUpError }/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Root;