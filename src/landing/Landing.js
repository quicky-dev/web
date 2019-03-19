import React, { Component } from 'react';
import './Landing.css'
import logo from '../logo.png';

const Landing = (props) => (
    <div className="Landing">
        <img id="logo" src={logo} className="App-logo" alt="logo" />
        <p>Quicky</p>
    </div>

)

export default Landing