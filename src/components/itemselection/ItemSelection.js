import React, { Component } from "react";
import "./ItemSelection.css";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
//import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import { itemsAdd, itemsRemove } from "../../actions/items";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class ItemSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };

    this.toggleActions = this.toggleActions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * @name toggleActions
   * @description toggles whether to add or remove a selected item to/from state
   * @param {Object} item - the element of the item that has been selected
   * @param {boolean} checked - if the item has been checked or not.
   */
  toggleActions = (item, checked) => {
    const { itemsObj } = this.props;
    // checking if box is checked
    if (checked) {
      // if checked running our action itemsAdd
      this.props.dispatch(
        itemsAdd(this.props.items, itemsObj.currentCategory, item.value)
      );
    } else {
      // else, (uncheck) calling our action itemsRemove
      this.props.dispatch(
        itemsRemove(this.props.items, itemsObj.currentCategory, item.value)
      );
    }
  };

  // handles what happens when an option is selected
  // this method helps us persist the checked checkboxes as well
  handleSelect = async item => {
    try {
      const itemName = item.value;
      const { selected } = this.state;
      const { itemsObj } = this.props;
      const newSelected = selected;
      // item already selected and being unchecked
      if (selected[itemName]) {
        // already check, set false now
        newSelected[itemName] = false;
      } else {
        // not checked, set as true
        newSelected[itemName] = true;
      }

      // If we're selecting a shell, we have to ensure that only one is selected
      // because our installation script sets it as the primary shell for the
      // user.
      if (itemsObj.currentCategory === "Shells") {
        for (let i = 0; i < itemsObj.currentItems.length; i += 1) {
          const shell = itemsObj.currentItems[i];
          if (itemName !== shell) {
            newSelected[shell] = false;
          }
        }
      }

      // push the new selected option into state
      await this.setState({
        selected: newSelected
      });

      // call our toggleActions functions which handles dispatching
      // if an item is selected to state.
      this.toggleActions(item, selected[itemName]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Error selecting this options: ", err);
    }
  };

  render() {
    // eslint-disable-next-line
    const { itemsObj, classes, step, items } = this.props;

    return (
      <div className="item-selection">
        <div className="items">
          {itemsObj.currentItems.map(opt => (
            <div key={opt}>
              <Checkbox
                name={itemsObj.currentCategory}
                value={opt}
                checked={this.state.selected[opt] === true}
                onChange={e => this.handleSelect(e.target)}
              ></Checkbox>
              {opt}
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ItemSelection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemSelection);
