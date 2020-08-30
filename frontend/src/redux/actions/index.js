import store from '../store.js';

export function updateRawData(object) {
    return store.dispatch({type: 'UPDATE_RAW_VALUE', object});
}