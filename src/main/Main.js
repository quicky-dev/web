import React, { Component } from 'react';
import Landing from '../landing/Landing'
import './Main.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function LandingPage() {
    
}

function TerminalPage() {

}

function EditorPage() {

}

function LanguagePage() {

}

function ToolPage() {

}

function DownloadPage() {

}

const Main = (props) => (
    <Router>
        <div className="tempNav">
            <nav>
                <ul>
                    <li>
                        <Link to = "/">Landing</Link>
                    </li>
                    <li>
                        <Link to = "/form/1">Terminal</Link>
                    </li>
                    <li>
                        <Link to = "/form/2">Editor</Link>
                    </li>
                    <li>
                        <Link to = "/form/3">Language</Link>
                    </li>
                    <li>
                        <Link to = "/form/4">Tool</Link>
                    </li>
                    <li>
                        <Link to = "/form/download">Download</Link>
                    </li>
                </ul>
            </nav>

            

        </div>
        <div className="main">
            <Route path="/" exact component={Landing} />
            {/* <Route path="/form" component={} /> */}
        </div>
    </Router>
    
)

export default Main