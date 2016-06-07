'use strict'

const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));

require('./middleware/middleware.js')(app, express);

app.listen(port);

console.log(`Listening on port ${port}`);
