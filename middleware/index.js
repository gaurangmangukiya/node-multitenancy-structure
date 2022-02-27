const {payload, jwt} = require('../utils');
const common = require('../common');

/**
 * @method master - Authentication Middlewaere to check if the user is logged in
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns {Promise<void>} - Returns a promise
 */
exports.auth = async (req, res, next) => {
    req.session = {};

    /** Extract Token */
    let token = req.headers.authorization;

    if (!token) return payload.sendResponse({res, statusCode: 401, data: {error: 'Unauthorized'}});

    let data = jwt.verifyToken({ token: token });

    let userDetail = await common.master.userInfo({user: data._id, db: masterDB});

    if (!userDetail) return payload.sendResponse({res, statusCode: 401, data: {error: 'Unauthorized'}});

    req.session = {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        _id: userDetail._id,
        email: userDetail.email,
        profileImage: userDetail.profileImage,
        lastCompany: userDetail.lastCompany,
    };
    next();
};