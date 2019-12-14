const httpStatus = require('http-status');

const Model = require('../models');

module.exports.register = async (req, res, next) => {
    try {
        const {
            User,
            closeDbConnection
        } = new Model();

        const isUserExist = await User.getUserByEmail(req.body.email);
        if (isUserExist) {
            return res.status(httpStatus.CONFLICT)
                .json({
                    code: httpStatus.CONFLICT,
                    message: 'This email has already been taken'
                })
                .end();
        }

        const token = await User.generateAccessToken(req.body.email);

        const newUser = await User.createUser({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        // close database collection connection
        closeDbConnection();

        res.status(httpStatus.CREATED);
        res.json({
            code: httpStatus.CREATED,
            message: 'Created new user data',
            user: newUser,
            token
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const {
            User,
            closeDbConnection
        } = new Model();

        const user = await User.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'No account found with this email'
                })
                .end();
        }

        const isPasswordMatched = await User.comparePassword(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.status(httpStatus.BAD_REQUEST)
                .json({
                    code: httpStatus.BAD_REQUEST,
                    message: 'Wrong account or password'
                })
                .end();
        }

        const token = await User.generateAccessToken(req.body.email);

        // close db connection
        closeDbConnection();

        return res.status(httpStatus.OK)
            .json({
                message: 'Successfully log in',
                code: httpStatus.OK,
                user,
                token
            })
            .end();
    }
    catch (error) {
        next(error);
    }
};
