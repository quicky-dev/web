import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Main from '../main/Main';
import Landing from '../pages/landing/Landing';
import Download from '../pages/download/Download';
import SystemSelect from '../pages/systemselect/SystemSelect';

/**
 * @name App
 * @class
 * @classdesc The main container for pages & components.
 */

const Application = styled.div`
  height: 100%;
`;

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Application>
          <Route path="/" exact component={Landing} />

          <Route path="/os" exact component={SystemSelect} />

          <Route path="/form" exact component={Main} />

          <Route path="/setup" exact component={Download} />
        </Application>
      </BrowserRouter>
    );
  }
}

export default App;
