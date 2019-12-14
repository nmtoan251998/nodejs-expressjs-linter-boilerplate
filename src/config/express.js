const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const {
    log
} = require('./vars');
const Router = require('../api/routes/index.routes');
const error = require('../api/middlewares/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan(log));

app.use(Router);

// if error is not an instance of APIError, convert it
app.use(error.converter);

// handle 404 Not Found error
app.use(error.notFound);

// add a global error handler to catch the error responsed
app.use(error.handler);

module.exports = {
    app
};