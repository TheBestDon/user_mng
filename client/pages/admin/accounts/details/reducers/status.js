'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    error: undefined,
    hasError: {},
    help: {},
    accountId: undefined,
    options: [],
    current: {},
    log: [],
    newStatus: ''
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        const stateUpdates = Object.assign({}, initialState);

        stateUpdates.accountId = action.response._id;
        stateUpdates.options = state.options;

        if (action.response.hasOwnProperty('status')) {
            stateUpdates.current = action.response.status.current;
            stateUpdates.log = action.response.status.log.reverse();
            stateUpdates.newStatus = action.response.status.current.id;
        }

        return Object.assign({}, stateUpdates);
    }

    if (action.type === Constants.GET_STATUS_OPTIONS_RESPONSE) {
        const stateUpdates = {};

        if (action.response.hasOwnProperty('data')) {
            stateUpdates.options = action.response.data;
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.NEW_STATUS) {
        return Object.assign({}, state, {
            loading: true,
            newStatus: action.request.data.status
        });
    }

    if (action.type === Constants.NEW_STATUS_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (action.response.hasOwnProperty('status')) {
            stateUpdates.current = action.response.status.current;
            stateUpdates.log = action.response.status.log.reverse();
            stateUpdates.newStatus = action.response.status.current.id;
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.HIDE_STATUS_SAVE_SUCCESS) {
        return Object.assign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
