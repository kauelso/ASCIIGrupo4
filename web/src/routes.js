import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import Nova_senha from './pages/Nova_senha';
import Solicitar_senha from './pages/Solicitar_senha';

import PrivateRoute from './components/PrivateRoute';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch> 
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
                <Route path="/feedback" component={Feedback} />
                <Route path="/new-password" component={Nova_senha} />
                <Route path="/forgot-password" component={Solicitar_senha} />
            </Switch>
        </BrowserRouter>
    )
}