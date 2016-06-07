'use strict'

const express = require('express');
const morgan = require('morgan');
const app = express();
const raven = require('raven');
const port = process.env.PORT || 3000;

function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry+'\n');
}

// The request handler must be the first item
app.use(raven.middleware.express.requestHandler(process.env.SENTRYDSN));

app.use(raven.middleware.express.errorHandler(process.env.SENTRYDSN));

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));

require('./middleware/middleware.js')(app, express);

app.listen(port);

console.log(`Listening on port ${port}`);
