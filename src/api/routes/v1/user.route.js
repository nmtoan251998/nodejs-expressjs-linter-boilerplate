const Router = require('express').Router();

const {
    getUsers,
    deleteUsers,
    updateUserByEmail,
} = require('../../controllers/user.controller');

Router.route('/all').get(getUsers);

Router.route('/all').delete(deleteUsers);

Router.route('/management/email/:email').put(updateUserByEmail);


module.exports = Router;
