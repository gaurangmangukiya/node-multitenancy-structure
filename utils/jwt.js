const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');

/**
 * @method createToken = Create Token from Payload
 * @param payload - create Token
 * @returns {*}
 */
exports.createToken = ({ payload }) => {
    payload.token = randomstring.generate(5);
    return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
}

/**
 * @method verifyToken = Verify Token
 * @param token - Token
 * @returns {*}
 */
exports.verifyToken = ({ token }) => {
    return JWT.verify(token, process.env.JWT_SECRET);
}