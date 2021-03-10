const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const { token } = req.cookies

    if (!token) return res.status(401).send("Access Denied: No Token Provided")
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
        req.user = decoded;
        next()
    } catch (ex) {
        res.status(400).send("Invalid Token!")
    }
}
module.exports = auth;
