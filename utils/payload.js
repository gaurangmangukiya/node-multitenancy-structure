/**
 * @method sendResponse - Send Response utility for common code service
 * @param res - Express response object
 * @param statusCode - Status Code
 * @param data - data to be sent
 */
exports.sendResponse = ({res, statusCode, data}) => {
    res.status(statusCode).json({
        error: statusCode !== 200,
        statusCode: statusCode,
        data: { ...data, sendDate: new Date() }
    });
};


/**
 * @method apiHandler - APIs Handler to Handle Joi Payload and Handler
 * @param payload - Joi Payload
 * @param handler - Controller Handler
 * @returns {function(*, *): Promise<unknown>}
 */
exports.apiHandler = ({payload, handler}) => (req, res) => {
    /** Validate Payload if exists */
    const validatePayload = () =>
        new Promise(async (resolve, reject) => {
            try {
                if (!payload) return resolve();
                let {error} = payload.validate(req.body);

                if (error) {
                    return reject({ error: error.details?.[0].message, code: 400 });
                }
                return resolve();
            } catch (err) {
                console.log("[Error] => ", err);
            }
        })

    /** Call Handler */
    const processHandler = () =>
        new Promise(async (resolve, reject) => {
            try {
                handler(req, res)?.then(resolve)?.catch(reject);
            } catch (err) {
                console.log("[ERROR] PATH => ", req.path, err, JSON.stringify(req.body));
                return reject(err);
            }
        })


    return validatePayload()
        .then(processHandler)
        .then((data) => {
            return (this.sendResponse({res, statusCode: 200, data: data}));
        })
        .catch(err => {
            console.log("[ERROR] PATH => ", req.originalUrl, err, JSON.stringify(req.body));
            /** if no error and no code means something wrong in code */
            if (err?.error && err?.code) {
                return (this.sendResponse({res, statusCode: err.code, data: {...err}}));
            } else {
                return (this.sendResponse({res, statusCode: 500, data: err}));
            }
        })
};