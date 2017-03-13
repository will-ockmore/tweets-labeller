/* eslint-disable no-var, vars-on-top, prefer-template */
var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function getLocalhostAddr(port) {
  return 'http://localhost:' + port;
}

var webpackDevServerPort = 3000;
var serverPort = process.env.PORT || 9090;

module.exports = {
  appIndexJs: resolveApp('src/index.js'),
  appServerJs: resolveApp('src/server.js'),
  appScss: resolveApp('src/scss'),
  appIndexHtmlTemplate: resolveApp('public/index.html'),
  buildIndexHtml: resolveApp('build/index.html'),
  sourceDir: resolveApp('src'),
  nodeModules: resolveApp('node_modules'),
  buildDir: resolveApp('build'),
  appPublic: resolveApp('public'),

  // ports and addresses
  devServerPort: webpackDevServerPort,
  devServerAddr: getLocalhostAddr(webpackDevServerPort),
  nodeServerPort: serverPort,
  nodeServerAddr: getLocalhostAddr(serverPort),
};
