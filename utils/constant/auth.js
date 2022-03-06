const slugify = require("slugify");
const crypto = require("crypto");
const randomstring = require('randomstring');
module.exports = {
    USER_TYPE: {
        ADMIN: 1,
        USER: 2
    },
    OTP_TYPE: {
        VERIFY: 1,
        INVITATION: 2,
    },
    /** Scope for your common query. Small Pieces of Lego Game */
    SCOPE: {
        isDeleted: {isDeleted: false},
        isVerified: {isVerified: true},
        isNotVerified: {isVerified: false},
    },
    GET_OTP: () => Math.floor(100000 + Math.random() * 900000),
    GET_DB_STRING: ({name}) => slugify(process.env.DB_PREFIX + name.toLowerCase(), {
        lower: true,
        trim: true,
        remove: RegExp(/[*+~.()'"!:@]/g)
    }),
    GENERATE_RANDOM_STRING: () => crypto.randomBytes(64).toString('hex'),
    GENERATE_PASSWORD: () => randomstring.generate(8),
}