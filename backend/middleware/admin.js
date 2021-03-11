
const admin = (req, res, next) => {

    //401 - unauthorized
    // 403 - forbidden
    // console.log(req.user)
    if (req.user.role !== 'admin') return res.status(403).send("Access Denied.")
    next();
}
module.exports = admin;