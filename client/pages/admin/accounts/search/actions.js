/* global window */
'use strict';
const ApiActions = require('../../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');
const Qs = require('qs');


class Actions {
    static getResults(data) {

        ApiActions.get(
            '/api/accounts',
            data,
            Store,
            Constants.GET_RESULTS,
            Constants.GET_RESULTS_RESPONSE
        );
    }

    static changeSearchQuery(data, history) {

        history.push({
            pathname: '/admin/accounts',
            search: `?${Qs.stringify(data)}`
        });

        window.scrollTo(0, 0);
    }

    static showCreateNew() {

        Store.dispatch({
            type: Constants.SHOW_CREATE_NEW
        });
    }

    static hideCreateNew() {

        Store.dispatch({
            type: Constants.HIDE_CREATE_NEW
        });
    }

    static async createNew(data, history) {

        const response = await ApiActions.post(
            '/api/accounts',
            data,
            Store,
            Constants.CREATE_NEW,
            Constants.CREATE_NEW_RESPONSE
        );

        if (response.error) {
            console.error(response.error);
            return;
        }

        this.hideCreateNew();

        history.push(`/admin/accounts/${response.body._id}`);

        window.scrollTo(0, 0);
    }
}


module.exports = Actions;
