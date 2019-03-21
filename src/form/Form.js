import React, { Component } from 'react';
import './Form.css';
import { withStyles, Radio } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

// later this will be an api call
// for now use this to dynamically generate form
const installOptions = {
  'shells': ['zsh', 'fsh'],
  'editors': ['vim', 'vscode'],
  'languages': ['python', 'node'],
  'tools': ['mongo'],
};
 
function Form(props) {
    const { classes, step } = props;
    return (
        <div className='form-page'>
            <h1>Title</h1>
            <h3>Description goes here...</h3>
            <div className = "options">
                {/* This is just place holder for styling/proof of concept */}
                {
                  // check if step one
                  // render shell options
                  step === 1
    ? installOptions.shells.map(opt => <div><input type="radio" name="Shell" value="Zsh"></input>{ opt }<br></br></div>)
    : null
                }
            {/* <input type="radio" name="{property passed}" value="{again}"> {again}<br> */}
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)