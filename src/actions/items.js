import Axios from 'axios';

export const ADDED = "ITEM_ADDED";
export const REMOVED = "ITEM_REMOVED";
export const SET = "ITEMS_SET";

export function itemAdded(items) {
    return {
        type:ADDED,
        payload: items,
    }
}

export function itemRemoved(items) {
    return {
        type:REMOVED,
        payload: items,
    }
}

export function itemsBeenSet(items) {
    return {
        type:SET,
        payload: items,
    }
}

export function itemsAdd(items, category, item) {
   return dispatch => {
       items[category].push(item)
       dispatch(itemAdded(items))
   }
}

export function itemsRemove(items, category, item) {
    return dispatch => {
        const selectedCategory = items[category]
        const indexOfItem = selectedCategory.indexOf(item)
        items[category].pop(indexOfItem)

        dispatch(itemAdded(items))
    }
}

export function itemsSet(items) {
    return dispatch => dispatch(itemsBeenSet(items));
}
