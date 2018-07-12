'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    error: undefined
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        return Object.assign({}, initialState);
    }

    if (action.type === Constants.DELETE) {
        return Object.assign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.DELETE_RESPONSE) {
        const validation = ParseValidation(action.response);

        return Object.assign({}, state, {
            loading: false,
            error: validation.error
        });
    }

    return state;
};


module.exports = reducer;
