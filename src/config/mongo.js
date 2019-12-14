const {
    MongoClient,
    Logger
} = require('mongodb');


const {
    database,
    env
} = require('./vars');

const {
    uri,
    name
} = database;

const options = {
    useUnifiedTopology: true
};

if (env === 'development') {
    // Set debug level
    Logger.setLevel('debug');
    Logger.filter('class', ['Db']);
}

module.exports.connect = async () => {
    try {
        const client = await MongoClient.connect(uri, options);
        console.log('Database connection established');

        const db = client.db(name);

        return {
            db,
            client
        };
    }
    catch (error) {
        console.log(error);
        console.log('Error connecting to MongoDb');
        process.exit(0);
    }
};
