const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    title: String,
    description: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});


/** Just for Example how multi-tenancy works */