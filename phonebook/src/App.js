import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HomeButtons from './components/HomeButtons';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Crud Operation in cassandra</h2>
          </div>
          <HomeButtons />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
