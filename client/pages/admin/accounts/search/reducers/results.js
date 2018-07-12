'use strict';
const Constants = require('../constants');


const initialState = {
    hydrated: false,
    loading: false,
    error: undefined,
    data: [],
    pages: {},
    items: {}
};
const reducer = (state = initialState, action) => {

    if (action.type === Constants.GET_RESULTS) {
        return Object.assign({}, state, {
            hydrated: false,
            loading: true
        });
    }

    if (action.type === Constants.GET_RESULTS_RESPONSE) {
        return Object.assign({}, state, {
            hydrated: true,
            loading: false,
            data: action.data.data,
            pages: action.data.pages,
            items: action.data.items
        });
    }

    return state;
};


module.exports = reducer;
