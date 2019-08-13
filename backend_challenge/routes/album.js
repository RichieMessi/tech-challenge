const express = require('express')
const router = express.Router()

const { createAlbum, albumsByUser, albumMiddleware, albumByAlbumId, addPhoto, photoFromAlbum, photosFromUser, findIndividualPhoto } = require('../controller/album')
const { userById } = require('../controller/user')
const { requireSignIn } = require('../controller/auth')

router.post('/albums/create/', requireSignIn, createAlbum)
router.post('/photo/add/:albumId', addPhoto)
// router.post('/photo/add/:userId', addPhoto)


// ALL albums from specific user ID 
router.get('/albums/:userId', requireSignIn, albumsByUser)

// ONE album from specific album ID 
router.get('/album/:albumId', requireSignIn, albumByAlbumId)


// All photos  user ID
router.get('/photos/:userId', photosFromUser)

// Single photo of a specific album by album ID
router.get('/photo/:userId/:albumId/:photoId', photoFromAlbum)


router.param('userId', userById)
router.param('albumId', albumMiddleware)
router.param('photoId', findIndividualPhoto)

module.exports = router