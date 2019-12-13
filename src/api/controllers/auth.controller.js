const httpStatus = require('http-status');

const Model = require('../models');
const APIError = require('../utils/APIError');

module.exports.register = async (req, res, next) => {
    try {
        const { 
            User            
        } = new Model(req.database);

        const isUserExist = await User.getUserByEmail(req.body.email);
        if (isUserExist) {
            throw new APIError({
                message: 'This email is already taken',
                status: httpStatus.CONFLICT,
                isPublic: false,
            })
        }

        const token = await User.generateAccessToken(req.body.email);
        
        const newUser = await User.createUser({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        // close database collection connection
        req.database.client.close();

        res.status(httpStatus.CREATED)
        res.json({
            code: httpStatus.CREATED,
            message: 'Created new user data',
            user: newUser,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { 
            User            
        } = new Model(req.database);

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

        return res.status(httpStatus.OK)
            .json({
                message: 'Successfully log in',
                code: httpStatus.OK,
                user,
                token
            })
            .end();
    } catch (error) {
        next (error);
    }
}
