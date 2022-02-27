const mongoose = require('mongoose');
const constant = require('../utils/constant');

module.exports = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    role: {
        type: Number,
        enum: [constant.USER_TYPE.ADMIN, constant.USER_TYPE.USER],
        default: constant.USER_TYPE.USER
    },
    company: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
    },
    lastActiveAt: {
        type: Date,
    }
});