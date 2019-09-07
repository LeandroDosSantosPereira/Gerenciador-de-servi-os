import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
// import './main-page.css'
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import ChamadoPage from './ChamadoPage';
import ClientePage from './ClientePage';
import Splash from './Splash';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path='/' component={ Splash} />
            <Route path='/LoginPage' component={ LoginPage } />
            <Route path='/ChamadoPage' component={ ChamadoPage } />
            <Route path='/ClientePage' component={ ClientePage } />
            <Route path='/Splash' component={ Splash } />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
