const mongo = require('../../config/mongo');

module.exports.attachDb = async function(app) {
    const { db, client } = await mongo.connect();
    app.database = { db, client };
    next();
}