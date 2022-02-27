const {constant, error} = require("../../utils");


/**
 * @method userInfo - Get User Info
 * @param email
 * @param user
 * @returns {Promise<Object>} - Return User object
 */
exports.userInfo = ({email, user}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            if (email) query.email = email;
            if (user) query.user = user;
            let userInfo = await Mongo.findOne({db: masterDB, collection: constant.COLLECTION.USERS, query});
            return resolve(userInfo);
        } catch (err) {
            console.log("[ERROR] => ", err);
            return reject(err);
        }
    })
}


/**
 * @method generateOTP - generate OTP
 * @param otp - OTP
 * @param user - User
 * @param resend - resend OTP
 * @returns {Promise<Object>} - Return User object
 */
exports.generateOTP = ({user, otp, resend}) => {
    return new Promise(async (resolve, reject) => {
        let otpDetail;
        const getOTPDetail = () =>
            new Promise(async (resolve, reject) => {
                try {
                    /** get OTP Detail */
                    otpDetail = await Mongo.findOne({
                        db: masterDB,
                        collection: constant.COLLECTION.TOKEN,
                        query: {
                            user: user
                        }
                    });

                    if (!otpDetail && otp && !resend) return reject(error.auth.resendOTP);

                    if (otp) {
                        await verifyOTP();
                    } else {
                        if (otpDetail && !resend) return reject(error.auth.otpAlreadyExist);
                        await createOTP();
                    }

                    return resolve();
                } catch (err) {
                    return reject(err);
                }
            })


        const createOTP = () =>
            new Promise(async (resolve, reject) => {
                try {
                    let newOTP = constant.GET_OTP();
                    let otpData = {
                        $set: {
                            user: user,
                            otp: newOTP,
                            createdAt: new Date(),
                            type: constant.OTP_TYPE.VERIFY,
                        }
                    }

                    /** Save OTP */
                    await Mongo.updateOne({
                        db: masterDB,
                        collection: constant.COLLECTION.TOKEN,
                        query: {
                            user: user,
                        },
                        update: otpData,
                        options: {
                            upsert: true
                        }
                    })
                    return resolve();
                } catch (err) {
                    return reject(err);
                }
            })


        const verifyOTP = () =>
            new Promise(async (resolve, reject) => {
                try {
                    if (otpDetail.otp !== otp) return reject(error.auth.invalidOTP);

                    /** Deleting OTP and verify User */
                    await Promise.all([Mongo.updateOne({
                        db: masterDB,
                        collection: constant.COLLECTION.USERS,
                        query: {
                            user: user
                        },
                        update: {
                            $set: {
                                isVerified: true,
                                verifiedAt: new Date()
                            }
                        }
                    }),
                        Mongo.deleteOne({
                            db: masterDB,
                            collection: constant.COLLECTION.TOKEN,
                            query: {
                                user: user
                            }
                        })]);
                    return resolve();
                } catch (err) {
                    return reject(err);
                }
            })

        return getOTPDetail().then(resolve).catch(reject);
    })
};


/**
 * @method companyInfo - get Company Info by Id or companyId
 * @param companyId - String
 * @param _id - ObjectId
 * @returns {Object}
 */
exports.companyInfo = async ({companyId, _id}) => {
    try {
        let query = {};
        if (companyId) query.companyId = companyId;
        if (_id) query._id = _id;
        let companyInfo = await Mongo.findOne({
            db: masterDB,
            collection: constant.COLLECTION.COMPANY,
            query: query
        })
        if (companyInfo) return companyInfo;
        return null;
    } catch (err) {
        return false;
    }
}


/**
 * @method memberInfo - Check User is Member of Company or Not
 * @param user - ObjectId
 * @param company - ObjectId
 * @returns {Promise<Object|*>}
 */
exports.memberInfo = async ({ user, company }) => {
    try {
        let memberInfo = await Mongo.findOne({
            db: masterDB,
            collection: constant.COLLECTION.COMPANY_USER,
            query: {
                user: user,
                companyId: company,
                isDeleted: false
            }
        });
        if (memberInfo) return memberInfo;
        return false;
    }
    catch (err) {
        return false;
    }
}