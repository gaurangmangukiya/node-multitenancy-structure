const router = require('express').Router();
const AuthController = require('../../controllers/auth');
const {apiHandler} = require("../../utils/payload");
const {auth} = require("../../middleware");

/** Register Route */
router.post('/register',auth, apiHandler(AuthController.register));

module.exports = router;