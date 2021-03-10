const _ = require('lodash')
// create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // create jwt token 
    const token = user.generateAuthToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    user = _.pick(user, ['name', 'email', 'role'])
    res
        .status(statusCode)
        .cookie('token', token, options)
        .send({
            success: true,
            user,
            token
        })
    console.log(res.cookie)

}


module.exports = sendToken;