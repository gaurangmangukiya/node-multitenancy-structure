const Joi = require('joi');

/**
 * @method register - Register a new user
 * @type {{handler: (function(*, *): Promise<unknown>), payload: Joi.ObjectSchema<any>}}
 * @description Always export method with payload and Handler so common apis can handle it
 */
exports.register = {
    payload: Joi.object({}).options({allowUnknown: true}),
    handler: (req, res) =>
        new Promise(async (resolve, reject) => {
            try {
                return reject({error: "Error Registration", code: 400});
            } catch (err) {
                return reject(err);
            }
        })
};