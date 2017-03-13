/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
process.env.NODE_ENV = 'production';

var catchErr = require('./logger').catchErr;
var runBackend = require('./startBackend.js');


runBackend()
  .catch(catchErr);
