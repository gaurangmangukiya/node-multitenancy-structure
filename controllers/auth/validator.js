const Joi = require('joi');


/** Register Validator */
exports.register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    country: Joi.string().required(),
}).options({allowUnknown: true});


/** Login Validator */
exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({stripUnknown: true});


/** OTP Validator */
exports.verifyNow = Joi.object({
    otp: Joi.string().optional(),
    user: Joi.string().required(),
}).options({stripUnknown: true});

/** Change Password */
exports.changePassword = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
}).options({stripUnknown: true});