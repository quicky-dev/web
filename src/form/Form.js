import React from 'react';
import './Form.css';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
//import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

// should probably put this is state.
// will later be handled with backend request
// object that holds info for checkboxes (not all correct right now)
// const installOptions = {
//     'editors': ['vim', 'vscode', 'emacs'],
//     'shells': ['zsh', 'fish'],
//     'languages': ['python', 'node', 'go'],
// };
 
function Form(props) {
    // eslint-disable-next-line
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
