/* eslint-disable no-var, vars-on-top, prefer-template, no-plusplus, no-underscore-dangle */
var chalk = require('chalk');
var bodyParser = require('body-parser');
var express = require('express');
const mongoose = require('mongoose');

var paths = require('../config/paths.js');
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
mongoose.connect(process.env.MONGO_URL, { server: { auto_reconnect: true } });
var db = mongoose.connection;

db.on('error', err => {
  errorLogger(err);
  mongoose.disconnect();
});

db.on('disconnected', () => {
  mongoose.connect(process.env.MONGO_URL, { server: { auto_reconnect: true } });
});

// api
app.use('/api', api);

// return the app on index route
app.get('/', (req, res) => {
  res.sendFile(paths.buildIndexHtml);
});

http.listen(
  paths.nodeServerPort,
  () => console.log(chalk.cyan('Listening on port ') + chalk.yellow.bold(paths.nodeServerPort))
);

process.on('SIGINT', () => {
  db.close(() => {
    console.log('mongoose connection closed.');
    process.exit(0);
  });
});

