/**
 * @method auth - Authentication Middlewaere to check if the user is logged in
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns {Promise<void>} - Returns a promise
 */
exports.auth = async (req, res, next) => {
    console.log("Middleware Invoked => ", new Date());
    next();
};