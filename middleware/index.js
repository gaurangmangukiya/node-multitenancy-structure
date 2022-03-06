const {payload, jwt} = require('../utils');
const common = require('../common');
const {switchDB} = require("../loaders/mongoose");

/**
 * @method master - Authentication Middlewaere to check if the user is logged in
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns {Promise<void>} - Returns a promise
 */
exports.auth = async (req, res, next) => {
    let companyDetail, memberInfo;
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

    /** Check Company ID is there */
    if (req.headers.company) {

        /** Company Info */
        companyDetail = await common.master.companyInfo({company: req.headers.company, db: masterDB});

        /** Is Member or not */
        memberInfo = await common.master.memberInfo({user: userDetail._id, company: companyDetail._id, db: masterDB});

        if (!memberInfo) return payload.sendResponse({res, statusCode: 401, data: {error: 'Unauthorized'}});

        /** Set Company ID in session */
        req.session.company = companyDetail || null;
        req.session.userType = memberInfo?.type || null;
        req.session.db = await switchDB({ dbName: companyDetail.dbName });
    }
    next();
};
