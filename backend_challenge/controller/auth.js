const User = require('../model/User')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const { errorHandler } = require('../utilities/dbErrorHandlers')

const signUp = (req, res) => {

    const { name, email, password } = req.body
    const user = new User({name, email, password})
    user.save((err, user) => {
        if(err) return res.status(400).json({error: errorHandler(err)})
        user.salt = undefined
        user.hashed_password = undefined
        res.json({user})
    })
}

const signIn = (req, res, next) => {

    const { email, password } = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User with that emai does not exist.Please sign up "
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password does not match'
            })
        }

        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, {expire: new Date() + 9999})

        const { _id, name, email, role } = user
        req.user = user
        return res.json({token, user: {_id, email, name, role}})
    })
}

const signOut = (req, res, next) => {
    res.clearCookie('t')
    res.json({message: 'Signout Success'})
}

const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

module.exports = {
    signUp,
    signIn,
    signOut,
    requireSignIn,
}