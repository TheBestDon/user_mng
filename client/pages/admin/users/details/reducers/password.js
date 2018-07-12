'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    userId: undefined,
    password: '',
    passwordConfirm: ''
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        return Object.assign({}, initialState, {
            userId: action.response._id
        });
    }

    if (action.type === Constants.SAVE_PASSWORD) {
        return Object.assign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.SAVE_PASSWORD_RESPONSE) {
        const validation = ParseValidation(action.response);

        return Object.assign({}, state, {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        });
    }

    if (action.type === Constants.HIDE_PASSWORD_SAVE_SUCCESS) {
        return Object.assign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
