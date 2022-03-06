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

/** Register Company */
router.post('/create-company', auth, apiHandler(AuthController.createCompany));

/** Get Workspace List */
router.post('/workspace-list', auth, apiHandler(AuthController.getWorkspaceList));

router.post('/dashboard', auth, apiHandler(AuthController.getDashboard));

/** Send Invitation */
router.post('/send-invitation', auth, apiHandler(AuthController.sendInvitation));
router.post('/accept-invitation', auth, apiHandler(AuthController.verifyInvitation));

/** OnBoard Employee */
router.post('/onboard-employee', auth, apiHandler(AuthController.onBoardEmployee));

module.exports = router;