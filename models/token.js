const mongoose = require('mongoose');
const { constant } = require('../utils');

module.exports = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    email: String,
    otp: String,
    type: {
        type: Number,
        enum: [...Object.values(constant.OTP_TYPE)],
        required: true
    },
    invitedBy: mongoose.Types.ObjectId,
}, {timestamps: true, expires: 60 * 60});