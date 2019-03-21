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
 
function Form(props) {
    const { classes } = props;
    return (
        <div className='form-page'>
            <h1>Title</h1>
            <h3>Description goes here...</h3>
            <div className = "options">
                {/* This is just place holder for styling/proof of concept */}
                <input type="radio" name="Shell" value="Zsh"></input>Zsh<br></br>
                <input type="radio" name="Shell" value="Fish"></input>Fish<br></br>
                <input type="radio" name="Shell" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
                <input type="radio" name="Vim" value="Vim"></input>Vim<br></br>
            {/* <input type="radio" name="{property passed}" value="{again}"> {again}<br> */}
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)