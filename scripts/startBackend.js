/* eslint-disable no-var, vars-on-top, no-console, prefer-template */
var childProcess = require('child_process');

var paths = require('../config/paths.js');

function runServer() {
  return new Promise((resolve, reject) => {
    // make sure the process doesn't throw twice
    // if it causes exit of process
    var invoked = false;

    var backendServer = childProcess.fork(paths.appServerJs);

    backendServer.on('error', (err) => {
      if (invoked) return;
      invoked = true;
      reject(err);
    });

    backendServer.on('exit', (code) => {
      if (invoked) return;
      invoked = true;
      if (code !== 0) {
        reject(new Error('exit code ' + code));
      } else {
        resolve(code);
      }
    });
  });
}

module.exports = runServer;
