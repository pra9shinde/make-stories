import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

//Components
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Route path='/auth' component={Auth} exact />
            <Route path='/' component={Home} />
        </BrowserRouter>
    );
}

export default App;
