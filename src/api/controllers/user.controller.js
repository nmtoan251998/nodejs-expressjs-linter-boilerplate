const httpStatus = require('http-status');

const Model = require('../models');

module.exports.getUsers = async (req, res, next) => {
    try {
        const {
            User,
            closeDbConnection
        } = new Model();

        // find all users
        const users = await User.getAllUsers();
        if (!users.length) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'No users found'
                })
                .end();
        }

        // close database collection connection
        closeDbConnection();

        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'OK',
                users
            })
            .end();
    }
    catch (error) {
        next(error);
    }
};

module.exports.deleteUsers = async (req, res, next) => {
    try {
        const {
            User,
            closeDbConnection
        } = new Model();

        const deletedResult = await User.deleteAllUsers();

        // close database collection connection
        closeDbConnection();

        res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Delete users data',
                deletedUsers: deletedResult
            })
            .end();

    }
    catch (error) {
        next(error);
    }
};

module.exports.updateUserByEmail = async (req, res, next) => {
    try {
        const {
            User,
            closeDbConnection
        } = new Model();

        /**
         * Check if whether user email is existed
         * if no email found, an APIError instance will be returned
         */
        const users = await User.getUserByEmail(req.params.email);
        if (!users) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'No user found with this email'
                })
                .end();
        }

        const updateResult = await User.updateUserByEmail(req.params.email, req.body);

        // close database collection connection
        closeDbConnection();

        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Updated user data',
                updateResult
            })
            .end();
    }
    catch (error) {
        next(error);
    }
};
