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
    const { itemsObj, classes, step } = props;
    return (
        <div className='form-page'>
            <h1>{itemsObj.currentCategory}</h1>
            <h3>{itemsObj.currentDesc}</h3>
            <div className = "options">
                {
                   itemsObj.currentItems.map(opt => <div><input type="radio" name="shells" value={ opt }></input>{ opt }<br /></div>)
                }
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)
