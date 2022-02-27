/** Export all the Constants on same Root so it always available on top */

module.exports = {
    ...require('./auth'),
    COLLECTION: {
        USERS: "users",
        TOKEN: "token",
    }
}