const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    contactInfo: {
        type: Object,
    },
    addressInfo: {
        type: Object,
    },
    companyId: {
        type: String,
    },
    website: String,
    logo: String,
    owner: mongoose.Types.ObjectId,
    description: String,
    dbName: String,
}, {timestamps: true});