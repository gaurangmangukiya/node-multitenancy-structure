const controller = require('./controller');
const validator = require('./validator');

/** Register Controller */
exports.register = {
    handler: controller.register,
    payload: validator.register
};

/** Login Controller */
exports.login = {
    handler: controller.login,
    payload: validator.login
};

/** Verify Controller */
exports.verifyNow = {
    handler: controller.sendOTP,
    payload: validator.verifyNow
}

/** Change Password Controller */
exports.changePassword = {
    handler: controller.changePassword,
    payload: validator.changePassword
}

/** Create Company */
exports.createCompany = {
    handler: controller.createCompany,
    payload: validator.createCompany,
}

/** WorkSpace List */
exports.getWorkspaceList = {
    handler: controller.getWorkspaceList,
}

/** Dashboard */
exports.getDashboard = {
    handler: controller.getDashboard,
}