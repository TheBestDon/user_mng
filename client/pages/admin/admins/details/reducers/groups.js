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
    options: [],
    groups: {},
    newGroup: ''
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        const stateUpdates = Object.ssign({}, initialState);

        stateUpdates.adminId = action.response._id;
        stateUpdates.options = state.options;

        if (action.response.hasOwnProperty('groups')) {
            stateUpdates.groups = action.response.groups;
        }

        return Object.ssign({}, stateUpdates);
    }

    if (action.type === Constants.GET_GROUP_OPTIONS_RESPONSE) {
        const stateUpdates = {};

        if (action.response.hasOwnProperty('data')) {
            stateUpdates.options = action.response.data;
        }

        return Object.ssign({}, state, stateUpdates);
    }

    if (action.type === Constants.SAVE_GROUPS) {
        return Object.ssign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.SAVE_GROUPS_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (action.response.hasOwnProperty('groups')) {
            stateUpdates.groups = action.response.groups;
        }

        return Object.ssign({}, state, stateUpdates);
    }

    if (action.type === Constants.HIDE_GROUPS_SAVE_SUCCESS) {
        return Object.ssign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
