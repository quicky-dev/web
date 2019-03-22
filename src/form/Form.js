import React from 'react';
import './Form.css';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
//import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { itemsAdd, itemsRemove } from '../actions/items';


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
    // toggleActions toggles between our actions 'itemsAdd' and 'itemsRemove' on click
    const toggleActions = (e) => {
        // checking if box is checked
        if (e.target.checked) {
            // if checked running our action itemsAdd
            props.dispatch(itemsAdd(props.items, itemsObj.currentCategory, e.target.value));
        } else {
            // else, (uncheck) calling our action itemsRemove
            props.dispatch(itemsRemove(props.items, itemsObj.currentCategory, e.target.value));
        }
    };
    return (
        <div className='form-page'>
            <h1>{itemsObj.currentCategory}</h1>
            <h3>{itemsObj.currentDesc}</h3>
            <div className="options">
                {
                    itemsObj.currentCategory !== 'Shells'
                        ? itemsObj.currentItems.map(opt => <div key={opt}><Checkbox type="checkbox" name={itemsObj.currentCategory} value={opt} onClick={toggleActions}></Checkbox>{opt}<br /></div>)
                        : itemsObj.currentItems.map(opt => <div key={opt}><Checkbox type="radio" name={itemsObj.currentCategory} value={opt} onClick={toggleActions}></Checkbox>{opt}<br /></div>)
                }
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)
