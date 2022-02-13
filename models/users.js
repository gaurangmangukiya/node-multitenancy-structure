const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    profileImage: String,
    email: String,
    password: String,
    isVerified: Boolean,
    verifiedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}, {timestamps: true});