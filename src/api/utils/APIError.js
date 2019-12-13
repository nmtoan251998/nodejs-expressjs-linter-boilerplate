const httpStatus = require('http-status');

class ExtendableError extends Error {
    constructor({ message, errors, status, isPublic, stack }) {
        super(message);

        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;

        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
        this.stack = stack;
    }
}

class APIError extends ExtendableError {
    /**
     * Create an APIError instance
     * @param {string} message Error message
     * @param {object[]} errors Array contains error object
     * @param {number} status HTTP error status code
     * @param {object} stack Error stack
     * @param {boolean} isPublic Whether the message should be visible to user or not
     */
    constructor({ 
        message, 
        errors,
        stack,
        status = httpStatus.INTERNAL_SERVER_ERROR, 
        isPublic = false,
    }) {
        super({
            message,
            errors,
            status,
            isPublic,
            stack
        });
    }
}

module.exports = APIError;