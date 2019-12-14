const mongo = require('../../config/mongo');
const APIError = require('../utils/APIError');

const User = require('./user.model');

let db, client;

(async function extractDatabaseInstances() {
    connection = await mongo.connect();
    client = connection.client;
    db = connection.db;
})();

class Model {
    constructor() {
        this.userCollection = db.collection('users');

        this.User = new User(this.userCollection);
    }

    closeDbConnection() {
        try {
            client.close();
        } catch (error) {
            throw new APIError({
                message: 'Error disconnecting MongoDb connection',
                status: 500,
                stack: error.stack,
                isPublic: false
            });
        }
    }
}

module.exports = Model;
