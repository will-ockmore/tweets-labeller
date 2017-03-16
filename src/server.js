/* eslint-disable no-var, vars-on-top, prefer-template, no-plusplus, no-underscore-dangle */
var chalk = require('chalk');
var bodyParser = require('body-parser');
var express = require('express');
const mongoose = require('mongoose');

var paths = require('../config/paths.js');
var LOG_PREFIX = 'express backend';
var logger = require('../scripts/logger.js').createLogger(LOG_PREFIX);
var errorLogger = require('../scripts/logger.js').catchErr;

var api = require('./routes/api.js');


var app = express();
var http = require('http').Server(app);

// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// direct requests for static files
app.use(express.static(paths.buildDir));

// mongodb connection uri
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;

app.set('db', db);

// api
app.use('/api', api)

// return the app on index route
app.get('/', (req, res) => {
  res.sendFile(paths.buildIndexHtml);
});

http.listen(paths.nodeServerPort, () => logger(chalk.cyan('Listening on port ') + chalk.yellow.bold(paths.nodeServerPort)));

process.on('SIGINT', () => {
  db.close(() => {
    logger('mongoose connection closed.');
    process.exit(0);
  });
});

