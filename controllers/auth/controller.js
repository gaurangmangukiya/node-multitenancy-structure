const common = require('../../common');
const ObjectId = require('mongoose').Types.ObjectId;
const {constant, error, bcrypt, jwt} = require('../../utils');
/**
 * @method register - Register controller
 * @param req - Express Object
 * @returns {Promise<Object>}
 */
exports.register = (req) => new Promise(async (resolve, reject) => {

    const checkUserExistence = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let userDetail = await common.master.userInfo({email: req.body.email, db: masterDB});
                if (userDetail) return reject(error.auth.userExists);
                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }


    const createUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await Mongo.insertOne({
                    db: masterDB, collection: constant.COLLECTION.USERS, document: {
                        ...req?.body, password: await bcrypt.getHash({password: req?.body?.password}),
                    }
                });
                return resolve({
                    ...req?.body
                });
            } catch (err) {
                return reject(err);
            }
        });
    }


    return checkUserExistence().then(createUser).then(resolve).catch(reject);
});


exports.login = (req) => new Promise(async (resolve, reject) => {
    let userDetail;

    const verifyUser = () => new Promise(async (resolve, reject) => {
        try {
            /** Get User Detail */
            userDetail = await common.master.userInfo({email: req.body.email, db: masterDB});
            if (!userDetail) return reject(error.auth.userNotFound);

            /** Verify Password */
            let isPasswordValid = await bcrypt.compareHash({
                password: req.body.password, hash: userDetail.password
            });

            /** Password is not valid */
            if (!isPasswordValid) return reject(error.auth.invalidPassword);

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })

    const checkUserVerifiedOrNot = () => new Promise(async (resolve, reject) => {
        try {
            /** Check User Verified Or Not */
            if (!userDetail.isVerified) return reject({
                ...error.auth.isNotVerified,
                email: userDetail.email,
                _id: userDetail._id,
                firstName: userDetail.firstName,
                lastName: userDetail.lastName
            });
            let token = jwt.createToken({payload: {_id: userDetail._id, email: userDetail.email}});

            return resolve({
                ...userDetail, password: undefined, token: token, isVerified: undefined, verifiedAt: undefined,

            });
        } catch (err) {
            return reject(err);
        }
    })

    return verifyUser().then(checkUserVerifiedOrNot).then(resolve).catch(reject);
});


exports.sendOTP = (req) => new Promise(async (resolve, reject) => {
    let userDetail;

    const checkUserExists = () => new Promise(async (resolve, reject) => {
        try {
            /** Get User Detail */
            userDetail = await common.master.userInfo({email: req.body.email, db: masterDB});
            if (!userDetail) return reject(error.auth.userNotFound);

            if (userDetail.isVerified) return reject(error.auth.isVerified);

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })

    const sendOTP = () => new Promise(async (resolve, reject) => {
        common.master.generateOTP({
            user: userDetail._id, otp: req.body.otp || undefined, resend: req.body.resend || undefined
        }).then(resolve).catch(reject);
    })


    return checkUserExists().then(sendOTP).then(resolve).catch(reject);
})


/** Change Password */
exports.changePassword = (req) => new Promise(async (resolve, reject) => {
    let userDetail;

    const getUserDetail = () => new Promise(async (resolve, reject) => {
        try {
            userDetail = await common.master.userInfo({user: req.session._id, db: masterDB});
            if (!userDetail) return reject(error.auth.userNotFound);

            return resolve(userDetail);
        } catch (err) {
            return reject(err);
        }
    })


    const changePassword = () => new Promise(async (resolve, reject) => {
        try {
            let isPasswordValid = await bcrypt.compareHash({
                password: req.body.password, hash: userDetail.password
            });

            if (!isPasswordValid) return reject(error.auth.invalidPassword);

            let newPassword = await bcrypt.getHash({password: req.body.newPassword});

            await Mongo.updateOne({
                db: masterDB,
                collection: constant.COLLECTION.USERS,
                query: {_id: userDetail._id},
                update: {$set: {password: newPassword}}
            });

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })

    return getUserDetail().then(changePassword).then(resolve).catch(reject);
});


/** create Company */
exports.createCompany = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            let companyInfo = await common.master.companyInfo({
                companyId: req.body.companyId,
                db: masterDB
            });

            if (companyInfo) return reject(error.auth.companyExists);
            let companyObjectId = ObjectId();

            await Promise.all([
                Mongo.insertOne({
                    db: masterDB,
                    collection: constant.COLLECTION.COMPANY,
                    document: {
                        _id: companyObjectId,
                        name: req.body.name,
                        contactInfo: req.body.companyInfo || {},
                        addressInfo: req.body.addressInfo || {},
                        website: req.body.website || undefined,
                        description: req.body.description || undefined,
                        owner: req.session._id,
                        dbName: constant.GET_DB_STRING({name: req.body?.companyId}),
                        companyId: req.body.companyId,
                        createdAt: new Date()
                    }
                }),
                Mongo.insertOne({
                    db: masterDB,
                    collection: constant.COLLECTION.COMPANY_USER,
                    document: {
                        company: companyObjectId,
                        user: req.session._id,
                        role: constant.USER_TYPE.ADMIN,
                        addedBy: req.session._id,
                    }
                })
            ]);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })


/** get workspace list */
exports.getWorkspaceList = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            let companies = await Mongo.distinct({
                db: masterDB,
                collection: constant.COLLECTION.COMPANY_USER,
                field: "company",
                query: {user: req.session._id, ...constant.SCOPE.isDeleted}
            });
            let workspace = await Mongo.find({
                db: masterDB,
                collection: constant.COLLECTION.COMPANY,
                query: {_id: {$in: companies}},
                project: "name companyId"
            })
            return resolve({list: workspace});
        } catch (err) {
            return reject(err);
        }
    })


exports.getDashboard = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            return resolve({data: req.session});
        } catch (err) {
            return reject(err);
        }
    })


exports.sendInvitation = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            await common.master.sendInvitation({
                email: req.body.email,
                company: req.body.company,
                invitedBy: req.session._id
            });
            return resolve({data: "invitation sent"});
        } catch (err) {
            return reject(err);
        }
    })


exports.verifyInvitation = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!req.body.token) return reject(error.auth.invalidToken);
            await common.master.verifyInvitation({user: req.session._id, token: req.body.token});
            return resolve({data: "invitation verified"});
        } catch (err) {
            return reject(err);
        }
    })

exports.onBoardEmployee = (req) =>
    new Promise(async (resolve, reject) => {
        try {
            let password = constant.GENERATE_PASSWORD();
            let hashedPassord = await bcrypt.getHash({password});
            let userObj = await Mongo.insertOne({
                db: masterDB,
                collection: constant.COLLECTION.USERS,
                document: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassord,
                    isVerified: true
                }
            })
            await Mongo.insertOne({
                db: masterDB,
                collection: constant.COLLECTION.COMPANY_USER,
                document: {
                    user: userObj._id,
                    company: req.body.company,
                    role: constant.USER_TYPE.USER,
                    addedBy: req.session._id,
                }
            })
            return resolve({message: "Employee added successfully", email: userObj.email, password});
        } catch (err) {
            return reject(err);
        }
    })