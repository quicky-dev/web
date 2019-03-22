import React, { Component } from 'react';
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

// toggleActions toggles between our actions 'itemsAdd' and 'itemsRemove' on click
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
        };

        this.toggleActions = this.toggleActions.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    toggleActions = (e, checked) => {
        const { itemsObj } = this.props;
        // checking if box is checked
        if (checked) {
            // if checked running our action itemsAdd
            this.props.dispatch(itemsAdd(this.props.items, itemsObj.currentCategory, e.target.value));
        } else {
            // else, (uncheck) calling our action itemsRemove
            this.props.dispatch(itemsRemove(this.props.items, itemsObj.currentCategory, e.target.value));
        }
    };
    // makes so users can only check one option when choosing a shell
    handleSelect = (e) => {
        const { itemsObj } = this.props;
        this.props.dispatch(itemsRemove(this.props.items, itemsObj.currentCategory, this.state.selected));
        return this.setState({
            selected: e.target.id,
        });
    };


    render() {
         // eslint-disable-next-line
        const { itemsObj, classes, step, items } = this.props;
       
    return (
        <div className='form-page'>
            <h1>{itemsObj.currentCategory}</h1>
            <h3>{itemsObj.currentDesc}</h3>
            <div className="options">
                {
                    itemsObj.currentCategory !== 'Shells'
                        ? itemsObj.currentItems.map(opt => <div key={opt}><Checkbox name={itemsObj.currentCategory} value={opt} onChange={this.toggleActions}></Checkbox>{opt}<br /></div>)
                        : itemsObj.currentItems.map(opt => <div key={opt}><Checkbox id={ opt } name={itemsObj.currentCategory} checked={this.state.selected === opt} value={opt} onClick={this.handleSelect} onChange={this.toggleActions}></Checkbox>{opt}<br /></div>)
                }
            </div>
        </div>
    )
}
    }
   

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)
