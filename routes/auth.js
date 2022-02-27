const router = require('express').Router();
const AuthController = require('../controllers/auth');
const {apiHandler} = require("../utils/payload");
const {auth} = require("../middleware");

/** Register Route */
router.post('/register', apiHandler(AuthController.register));

/** login route */
router.post('/login', apiHandler(AuthController.login));

/** OTP Route */
router.post('/verifynow', apiHandler(AuthController.verifyNow));

/** Change Password */
router.put('/changepassword', auth, apiHandler(AuthController.changePassword));

module.exports = router;