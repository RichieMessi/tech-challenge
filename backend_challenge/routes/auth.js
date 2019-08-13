const express = require('express')
const router = express.Router()

const { userSignupValidator } = require('../validator')

const { signUp, signIn, signOut, requireSignIn } = require('../controller/auth')


router.post('/auth/signup', userSignupValidator, signUp)
router.post('/auth/signin', signIn)
router.get('/signout', signOut)

router.get('/hello', requireSignIn, (req, res) => {
    res.send('HELLO FROM PROTECTED')
})

module.exports = router