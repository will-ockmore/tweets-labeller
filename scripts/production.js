/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'production';

var runBackend = require('./startBackend.js');


runBackend();
