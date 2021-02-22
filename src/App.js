import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/auth' component={Auth} exact />
                <Route path='/user' component={Home} />
                <Route path='/' component={Auth} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
