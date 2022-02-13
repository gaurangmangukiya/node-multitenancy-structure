const mongoose = require('mongoose');

module.exports = {
    users: mongoose.model('users', require('./users')),
    company: mongoose.model('company', require('./company')),
    members: mongoose.model('members', require('./members')),
};