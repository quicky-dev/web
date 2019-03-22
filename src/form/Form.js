import React from 'react';
import './Form.css';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
//import Button from '@material-ui/core/Button';
import { itemsAdd } from '../actions/items';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


function Form(props) {
    // eslint-disable-next-line
    const { itemsObj, classes, step, items } = props;
    return (
        <div className='form-page'>
            <h1>{itemsObj.currentCategory}</h1>
            <h3>{itemsObj.currentDesc}</h3>
            <div className="options">
                {
                    itemsObj.currentCategory !== 'Shells'
                        ? itemsObj.currentItems.map(opt => <div key={opt}><input type="checkbox" name={itemsObj.currentCategory} value={opt} onClick={() => props.dispatch(itemsAdd(props.items, itemsObj.currentCategory, opt))}></input>{opt}<br /></div>)
                        : itemsObj.currentItems.map(opt => <div key={opt}><input type="radio" name={itemsObj.currentCategory} value={opt} onClick={() => props.dispatch(itemsAdd(props.items, itemsObj.currentCategory, opt))}></input>{opt}<br /></div>)
                }
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)
