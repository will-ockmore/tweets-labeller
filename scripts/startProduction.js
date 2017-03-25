/* eslint-disable no-var, vars-on-top, object-shorthand, no-console, prefer-template */

/* Taken from the pm2 docs.
 * http://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/
 */

const pm2 = require('pm2');

const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

pm2.connect(() => {
  pm2.start({
    script: 'src/server.js',
    name: 'production-app',
    exec_mode: 'cluster',
    instances: instances,
    max_memory_restart: maxMemory + 'M',
    env: {
      NODE_ENV: 'production',
    },
  }, (err) => {
    if (err) return console.error('Error while launching applications', err.stack || err);
    console.log('PM2 and application has been succesfully started');

    // Display logs in standard output
    pm2.launchBus((error, bus) => {
      if (error) return console.error('Error while launching bus', err.stack || err);

      console.log('[PM2] Log streaming started');

      bus.on('log:out', (packet) => {
        console.log(packet.data);
      });

      bus.on('log:err', (packet) => {
        console.error(packet.data);
      });
    });
  });
});
