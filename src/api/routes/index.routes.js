const Router = require('express').Router();

const authRoute = require('./auth.route');
const userRoute = require('./v1/user.route');

Router.use('/auth', authRoute);
Router.use('/api/v1/user', userRoute);

module.exports = Router;
