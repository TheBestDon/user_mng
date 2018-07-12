'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');

Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'Barquiz App',
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            production: process.env.PORT,
            dev: process.env.PORT,
            $default: 8080
        }
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    hapiMongoModels: {
        mongodb: {
            connection: {
                uri: {
                    $filter: 'env',
                    production: process.env.MONGODB_URI,
                    dev: process.env.MONGODB_URI,
                    $default: 'mongodb://localhost:27017/'
                },
                db: {
                    $filter: 'env',
                    production: process.env.MONGODB_DB_NAME,
                    test: 'bar-test',
                    dev: process.env.MONGODB_DB_NAME,
                    $default: 'bar'
                }
            }
        },
        autoIndex: true
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'suit4ult@gmail.com',
            pass: process.env.SMTP_PASSWORD
        }
    },
    system: {
        fromAddress: {
            name: 'Bar Quiz',
            address: 'suit4ult@gmail.com'
        },
        toAddress: {
            name: 'Bar Quiz',
            address: 'suit4ult@gmail.com'
        }
    }
};

const store = new Confidence.Store(config);

exports.get = function (key) {

    return store.get(key, criteria);
};

exports.meta = function (key) {

    return store.meta(key, criteria);
};
