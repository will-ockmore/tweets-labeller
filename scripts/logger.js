/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var chalk = require('chalk');


function createLogger(prefix) {
  var LOG_PREFIX = chalk.blue.bold(`[${prefix}]`) + ':';
  return function logger(message) {
    if (message) {
      return console.log(LOG_PREFIX, message);
    }
    return console.log();
  };
}

function catchErr(err) {
  return console.log(chalk.red(err.stack));
}

module.exports = {
  createLogger,
  catchErr,
};
