const rowInitialValue = {
    toastId: null
};

export function rawReducer(state = rowInitialValue, action) {
    const {keys = []} = action;

    switch (action.type) {
        case 'UPDATE_RAW_VALUE':
            return {...state, ...action.object};

        case 'DELETE_RAW_VALUE':
            delete state(action.key);
            return {...state};

        case 'CLEAR_RAW_VALUE':
            return rowInitialValue;

        case 'CLEAR_RAW_VALUE_EXCEPT_KEYS':
            let newObj = {};
            keys.forEach((key) => {
                newObj[key] = state[key];
            });
            return {...newObj};

        default:
            return state;
    }
}