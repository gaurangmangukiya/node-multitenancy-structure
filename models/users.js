const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profileImage: String,
    email: String,
    password: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    lastCompany: mongoose.Types.ObjectId,
    verifiedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}, {timestamps: true});