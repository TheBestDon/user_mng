'use strict';
const Constants = require('../constants');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    accountId: undefined,
    notes: [],
    newNote: ''
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        const stateUpdates = Object.assign({}, initialState);

        stateUpdates.accountId = action.response._id;

        if (action.response.hasOwnProperty('notes')) {
            stateUpdates.notes = action.response.notes.reverse();
        }

        return Object.assign({}, stateUpdates);
    }

    if (action.type === Constants.NEW_NOTE) {
        return Object.assign({}, state, {
            loading: true,
            newNote: action.request.data.newNote
        });
    }

    if (action.type === Constants.NEW_NOTE_RESPONSE) {
        const validation = ParseValidation(action.response);
        const stateUpdates = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (action.response.hasOwnProperty('notes')) {
            stateUpdates.newNote = '';
            stateUpdates.notes = action.response.notes.reverse();
        }

        return Object.assign({}, state, stateUpdates);
    }

    if (action.type === Constants.HIDE_NOTE_SAVE_SUCCESS) {
        return Object.assign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
