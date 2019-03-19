import React, { Component } from 'react';
import './Landing.css'
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
        <img id="logo" src={logo} className="App-logo" alt="logo" />
        <h1>Quicky</h1>
        <h2>The one stop shop for your dev environment</h2>
        <Button variant="contained" className={classes.button}>
        Get Started
        </Button>
    </div>
    )
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Landing)