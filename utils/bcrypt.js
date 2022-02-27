const bcrypt = require('bcrypt');

/**
 * @method getHash getHash password
 * @param password
 * @returns {*}
 */
exports.getHash = ({ password }) => {
    return bcrypt.hash(password, 10);
};


/**
 * @method compare compare password
 * @param password
 * @param hash
 * @returns {*}
 */
exports.compareHash = ({ password, hash }) => {
    return bcrypt.compare(password, hash);
};