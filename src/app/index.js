import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "../main/Main";
import Landing from "../pages/landing/Landing";
import Download from "../pages/download/Download";

/**
 * @name App
 * @class
 * @classdesc The main container for pages & components.
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Landing} />

          <Route path="/form" exact component={Main} />

          <Route path="/setup" exact component={Download} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
