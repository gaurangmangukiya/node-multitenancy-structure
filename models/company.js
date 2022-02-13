const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    email: String,
    website: String,
    logo: String,
    owner: mongoose.Types.ObjectId,
    description: String,
}, {timestamps: true});