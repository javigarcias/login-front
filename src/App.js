import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/admin' component={Admin} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
