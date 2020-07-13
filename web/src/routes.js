import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

import PrivateRoute from './components/PrivateRoute';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch> 
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    )
}