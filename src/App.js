import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Provider} from './context';

import Index from './components/layout/Index';
import Navbar from './components/layout/Navbar';
import Lyrics from './components/tracks/Lyrics';

class App extends Component {
  render() {
    return (
      <Provider>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path='/lyrics/track/:id' component={Lyrics} /> 
            </Switch>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
