const Album = require('../model/Album')
const User = require('../model/User')
const formidable = require('formidable')
const fs = require('fs')


const albumMiddleware = (req, res, next, id) => {
    Album.findById(id)
        .exec((err, album) => {
            if(err || !album) {
                return res.status(400).json({
                    error: err
                })
            }
            req.album = album
    next()
        })
}

const createAlbum = (req, res) => {
    
    const { title, userId } = req.body
    const album = new Album({title, userId})
    
    album.save()
        .then(album => res.json(album))
        .catch(error => res.status(400).json({error}))
}

const albumsByUser = (req, res) => {

    Album.find({userId: req.profile._id})
        .then(albums => res.json(albums))
        .catch(error => res.status(400).json({error}))
}

const albumByAlbumId = (req, res) => {
    const { _id } = req.album
    Album.findById({_id})
        // .select("_id title userId")
        .then(album => res.json(album))
        .catch(error => res.status(400).json({error}))
}


const addPhoto = (req, res, next) => {
    console.warn('===================RUNNNING=====================')
    console.warn(req.album)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
            if(err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }
            
            const { title, albumId, userId } = fields
            console.warn(title, albumId, userId)
            const photo = {data: fs.readFileSync(files.photo.path), contentType: files.photo.type, title, userId: userId }
            console.warn(photo)
            Album.findOne({_id: albumId})
                .then(album => {
                    album.photos.push(photo)
                    album.save()
                })
                .then(() => res.send('Photo Upload Successful'))
                .catch(err => res.status(400).json(err))
        })
}

const photoFromAlbum = (req, res) => {

    Album.find({userId: req.profile._id})
        .select("photos")
        .findOne({_id: req.album._id})
        .then(photo => {
            res.json(photo)
        })

}

const photosFromUser = (req, res) => {
    const { _id } = req.profile
    Album.find({userId: _id})
        .select("photos")
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
}

const findIndividualPhoto = (req, res, next, id) => {
    req.photoId = id
    next()
}
module.exports = {
    createAlbum,
    albumsByUser,
    albumByAlbumId,
    albumMiddleware,
    addPhoto,
    photoFromAlbum,
    photosFromUser,
    findIndividualPhoto
}