'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    show: false,
    loading: false,
    error: undefined,
    hasError: {},
    help: {}
};
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case Constants.CREATE_NEW:
            return Object.assign({}, state, {
                loading: true
            });
        case Constants.CREATE_NEW_RESPONSE:
            const validation = ParseValidation(action.response);

            return Object.assign({}, state, {
                loading: false,
                error: validation.error,
                hasError: validation.hasError,
                help: validation.help
            });
        case Constants.SHOW_CREATE_NEW:
            return Object.assign({}, state, {
                show: true
            });
        case Constants.SHOW_CREATE_NEW:
            return Object.assign({}, state, {
                show: true
            });
        case Constants.HIDE_CREATE_NEW:
            return Object.assign({}, state, {
                show: false
            });
        default:
            return state;
    }
};


module.exports = reducer;
