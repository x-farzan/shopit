const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: ['user', 'admin'],
            message: 'Please select the correct role for user'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
// encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWTPRIVATEKEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
    return token
}

// reset password
userSchema.methods.getResetPasswordToken = function () {
    // genereate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and set to resetpasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')


    // set token expire time
    this.resetPasswordExpire = Date.now() + 60 * 60 * 1000

    return resetToken;
}



const User = mongoose.model("User", userSchema)

const userValidator = (user) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: new PasswordComplexity({
            min: 8,
            max: 50,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1
        }),
        avatar: Joi.object({
            public_id: Joi.string(),
            url: Joi.string()
        }),
        role: Joi.string(),
        resetPasswordToken: Joi.string()
    })
    return schema.validate(user)

}



exports.User = User;
exports.validation = userValidator;