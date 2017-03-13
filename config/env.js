/* eslint-disable no-var, vars-on-top, prefer-template, object-shorthand, func-names */

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

var processEnv =
  Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      PORT: JSON.stringify(
        process.env.PORT
      ),
    });

module.exports = { 'process.env': processEnv };
