import store from '../store.js';

export function updateRawData(object) {
    return store.dispatch({type: 'UPDATE_RAW_VALUE', object});
}

export function clearRawData() {
    return store.dispatch({type: 'CLEAR_RAW_VALUE'});
}