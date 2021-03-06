const path = require('path');
const dotenv = require('dotenv-safe');

/**
 * The below configuration with dotenv-safe will ensure that
 * all variables defined in .env.example
 * are also defined in .env
 */
dotenv.config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV || 'development',
    log: process.env.NODE_ENV === 'development' ? 'dev' : 'combined',
    port: process.env.PORT || 5000,
    database: {
        uri: process.env.DB_URI || 'mongodb://localhost:27017/',
        name: process.env.DB_NAME || 'fullstack-reactjs-nodejs-authentication',
    },
    secretOrPrivateKey: {
        value: process.env.SECRET_OR_PRIVATE_KEY,
        expiration: process.env.SECRET_OR_PRIVATE_KEY_EXPIRATION
    }
};
