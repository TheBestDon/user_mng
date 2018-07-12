'use strict';


const register = function (server, serverOptions) {

    server.route({
        method: 'GET',
        path: '/public/{param*}',
        options: {
            auth: false
        },
        handler: {
            directory: {
                path: 'public',
                listing: false
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/fonts/{param*}',
        options: {
            auth: false
        },
        handler: {
            directory: {
                path: 'public/media/font-awesome/fonts',
                listing: false
            }
        }
    });
};


module.exports = {
    name: 'web-public',
    dependencies: [],
    register
};
