const express = require('express');
const app = express();


/**
 * Load the express middleware
 */

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


/**
 * @route GET /test - Express Health Checkup Route
 */
app.get('/test', (req, res) => {
    res.status(200).send('.');
});


/** Loading Routes */

/** master Route */
app.use('/auth', require('../routes/auth'));


/**
 * Start Express Server with Port
 */
app.listen(process.env.PORT || 80, () => {
    console.log('[EXPRESS] started => ', process.env.PORT || 80, " At => ", new Date());
});