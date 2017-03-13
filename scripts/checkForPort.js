/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var prompt = require('react-dev-utils/prompt');
var detect = require('detect-port');
var chalk = require('chalk');


function checkForPort(portToCheck) {
  return new Promise((resolve) => detect(portToCheck)
      .then(port => {
        if (port === portToCheck) {
          resolve(port);
          return;
        }
        var question =
            chalk.yellow('Something is already running on port ' + portToCheck + '.') +
            '\n\nRun on a different port?';

        prompt(question, true)
          .then(shouldChangePort => {
            if (shouldChangePort) {
              resolve(port);
            }
          });
      })
  );
}

module.exports = checkForPort;

