import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Main from './main/Main';
import Landing from './landing/Landing';
import Form from './form/Form';

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
            path="/form/:step"
            exact
            render={({ match }) => {
              // step from url param 
              const { step } = match.params;
              return (
                <Main step={step} /> 
              )
            }}
          />

        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
