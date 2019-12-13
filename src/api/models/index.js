const User = require('./user.model');

class Model {
    constructor({ db, client }) {
        this.User = new User({ db, client });
    }
}

module.exports = Model;