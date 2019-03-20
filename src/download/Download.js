import React, { Component } from 'react';
import './Download.css'
import logo from '../logo.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

function Landing(props) {
    const { classes } = props;
    return (
    <div className="Landing">
        <div className="Download">
            <img id="dl-logo" src={logo} className="App-logo" alt="logo" />
            <br></br>
            <sub>Click <a href="#">here</a> if your download does not start automatically</sub>
        </div>
        <div className="Instructions">
            <pre>
                <code>
                    // Installation Instructions
                    <br></br><br></br>
                    1. Download the Script
                    <br></br>
                    2. Open your terminal
                    <br></br>
                    3. Navigate to the script's download location (i.e: cd Downloads/)
                    <br></br>
                    4. Run the following command: ./setup_script
                    <br></br><br></br>
                </code>
            </pre>
        </div>
        
    </div>
    )
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Landing)