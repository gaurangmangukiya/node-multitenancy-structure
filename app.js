process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
}).on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

/** load Mongoose */
const mongooseLoader = require('./loaders/mongoose');

/** load Environment Variables */
require('dotenv').config();

/** Connect DB and load express */
Promise.all([mongooseLoader.connect()]).then(async () => {
    require('./loaders/express');
}).catch((err) => {
    console.log("[ERROR] [DATABASE FAIL] => ", err);
    return process.exit(1);
});