process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
}).on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

/** load Mongoose */
const mongooseLoader = require('./loaders/mongoose');
global.Mongo = require('./utils/mongo');

/** load Environment Variables */
require('dotenv').config();

/** Connect DB and load express */
Promise.all([mongooseLoader.connect()]).then(async () => {
    global.masterDB = await mongooseLoader.switchDB({ dbName: process.env.MASTER_DB_NAME });
    require('./loaders/express');
}).catch((err) => {
    console.log("[ERROR] [DATABASE FAIL] => ", err);
    return process.exit(1);
});