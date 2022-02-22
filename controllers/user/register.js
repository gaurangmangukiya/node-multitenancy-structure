exports.register = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'User registered successfully'
            }
        });
    }
    catch (err) {
        console.log("[ERROR] -> ", err);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}