import { ADDED, REMOVED, SET } from '../actions/items';

export default function itemsReducer(state = null, action) {
    switch (action.type) {
        case ADDED:
            state = action.payload;
            break;
        case REMOVED:
            state = action.payload;
            break;
        case SET:
            state = action.payload;
            break;
        default:
            break;
    }
    // eslint-disable-next-line no-console
    console.log('Reducer State: ', state);
    return state;
}
