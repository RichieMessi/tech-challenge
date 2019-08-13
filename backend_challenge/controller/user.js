const User = require('../model/User')

const userById = (req, res, next, id) => {
    User.findById(id)
    .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: "User Not Found"})
        }
        req.profile = user // adds profile object in req with user info
        next()
    })
}

const getAllUsers = (req, res) => {
    User.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => console.warn(err))
}

module.exports = {
    getAllUsers,
    userById
}