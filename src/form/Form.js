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
            selectedShell: "",
            selected: {},
        };

        this.toggleActions = this.toggleActions.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    toggleActions = (item, checked) => {
        const { itemsObj } = this.props;
        // checking if box is checked
        if (checked) {
            // if checked running our action itemsAdd
            this.props.dispatch(itemsAdd(this.props.items, itemsObj.currentCategory, item.value));
        } else {
            // else, (uncheck) calling our action itemsRemove
            this.props.dispatch(itemsRemove(this.props.items, itemsObj.currentCategory, item.value));
        }
    };

    // makes so users can only check one option when choosing a shell
    handleSelectShell = (e) => {
        const { itemsObj } = this.props;
        this.props.dispatch(itemsRemove(this.props.items, itemsObj.currentCategory, this.state.selected));
        return this.setState({
            selectedShell: e.target.id,
        });
    };
    // handles what happens when an option is selected
    // this method helps us persist the checked checkboxes as well
    handleSelect = async (item) => {
        try {
            const { selected } = this.state;
            const newSelected = selected;
            // item already selected and being unchecked
            if (selected[item.value]) {
                // already check, set false now
                newSelected[item.value] = false;
            } else {
                // not checked, set as true
                newSelected[item.value] = true;
            }
           // push the new selected option into state
            await this.setState({
                selected: newSelected,
            });
            // call our toggleActions function
            this.toggleActions(item, selected[item.value])
    
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error selecting this options: ', err);
        };
   }

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
                        ? itemsObj.currentItems.map(opt => <div key={opt}><Checkbox name={itemsObj.currentCategory} value={opt} checked={this.state.selected[opt] === true} onChange={(e) => this.handleSelect(e.target)}></Checkbox>{opt}<br /></div>)
                        : itemsObj.currentItems.map(opt => <div key={opt}><Checkbox id={ opt } name={itemsObj.currentCategory} checked={this.state.selectedShell === opt} value={opt} onClick={this.handleSelectShell} onChange={this.toggleActions}></Checkbox>{opt}<br /></div>)
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
