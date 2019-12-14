const httpStatus = require('http-status');

const APIError = require('../utils/APIError');
const {
    env
} = require('../../config/vars');

/**
 * Handle errors and send them only in development
 */
const handler = (error, req, res, next) => {
    try {
        const response = {
            code: error.status,
            message: error.message || httpStatus[error.status],
            errors: error.errors,
            stack: error.stack
        };

        if (env !== 'development') {
            delete response.stack;
            delete response.errors;
        }
        else {
            console.log(error);
        }

        res.status(error.status);
        res.json(response);
        res.end();
    } catch (error) {
        next();
    }
};

const converter = (error, req, res, next) => {
    try {
        let convertedError = error;

        if (!(error instanceof APIError)) {
            convertedError = new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            });
        }

        return handler(convertedError, req, res);
    } catch (error) {
        next();
    }
};

/**
 * Create an instance of 404 Not Found error
 */
const notFound = (req, res, next) => {
    try {
        const error = new APIError({
            message: 'Not Found',
            status: httpStatus.NOT_FOUND
        });

        return handler(error, req, res);
    } catch (error) {
        next();
    }
};

module.exports = {
    handler: handler,
    notFound: notFound,
    converter: converter
};
