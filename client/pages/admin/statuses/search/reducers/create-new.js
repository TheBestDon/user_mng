'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    show: false,
    loading: false,
    error: undefined,
    hasError: {},
    help: {},
    pivot: '',
    name: ''
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.CREATE_NEW) {
        return Object.assign({}, state, {
            loading: true,
            pivot: action.request.data.pivot,
            name: action.request.data.name
        });
    }

    if (action.type === Constants.CREATE_NEW_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (!validation.error) {
            stateUpdates.pivot = '';
            stateUpdates.name = '';
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.SHOW_CREATE_NEW) {
        return Object.assign({}, state, {
            show: true
        });
    }

    if (action.type === Constants.HIDE_CREATE_NEW) {
        return Object.assign({}, state, {
            show: false
        });
    }

    return state;
};


module.exports = reducer;
