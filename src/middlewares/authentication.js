const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        let token = header && header.replace("Bearer ", "");

        if (!token) {
            return res.send({
                status: "Failed",
                message: "Access denied"
            })
        }

        const secretKey = process.env.SECRET_KEY;
        const verified = jwt.verify(token, secretKey);

        req.userId = verified.id;
        next();
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: "server error"
        })
    }
}

module.exports = auth