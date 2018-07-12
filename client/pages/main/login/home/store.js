'use strict';
const Constants = require('../constants');
const Redux = require('redux');


const initialState = {
    loading: false,
    success: false,
    validation: {
        error: undefined,
        hasError: {},
        help: {}
    }
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.RESET_STORE) {
        return Object.assign({}, initialState);
    }

    if (action.type === Constants.LOGIN) {
        return Object.assign({}, initialState, {
            loading: true
        });
    }

    if (action.type === Constants.LOGIN_RESPONSE) {
        return Object.assign({}, initialState, {
            success: Boolean(action.error) === false,
            validation: action.validation
        });
    }

    return state;
};


module.exports = Redux.createStore(reducer);
