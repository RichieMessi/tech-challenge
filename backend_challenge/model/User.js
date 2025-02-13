const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        trim: true
    },
    salt: String,
    created_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

    userSchema.methods = {
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password
        },
        encryptPassword: function(password) {

            if(!password) return '';
            try {
                return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex')
            } catch(err) {
                return '';
            }
        }
    }

const modelName = 'User'

module.exports = mongoose.model(modelName, userSchema)
