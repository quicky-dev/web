import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Main from './main/Main';
import Landing from './landing/Landing';
import Download from './download/Download';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div className="main">
                  <Landing />
                </div>
              )
              
            }}
          />

          <Route
            path="/form"
            exact
            component={ Main }
          />

          <Route
            path="/setup"
            exact
            render={() => {
              return (
                <div className="main">
                  <Download />
                </div>
              )
              }}
          />
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
