const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const photoSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    title: { type: String, trim: true },
    userId: { type: ObjectId, ref: "User" }
})

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        // unique: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    photos: [photoSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const modelName = 'Album'

module.exports = mongoose.model(modelName, albumSchema)
