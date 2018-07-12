'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    adminId: undefined,
    id: undefined,
    name: undefined
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        const stateUpdates = Object.assign({}, initialState);

        stateUpdates.adminId = action.response._id;

        if (action.response.hasOwnProperty('user')) {
            stateUpdates.id = action.response.user.id;
            stateUpdates.name = action.response.user.name;
        }

        return Object.assign({}, stateUpdates);
    }

    if (action.type === Constants.LINK_USER) {
        return Object.assign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.LINK_USER_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (action.response.hasOwnProperty('user')) {
            stateUpdates.id = action.response.user.id;
            stateUpdates.name = action.response.user.name;
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.UNLINK_USER) {
        return Object.assign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.UNLINK_USER_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            id: undefined,
            name: undefined
        };

        if (action.response.hasOwnProperty('user')) {
            stateUpdates.id = action.response.user.id;
            stateUpdates.name = action.response.user.name;
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.HIDE_USER_SAVE_SUCCESS) {
        return Object.assign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
