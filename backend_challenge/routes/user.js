const express = require('express')
const router = express.Router()

const { getAllUsers } = require('../controller/user')


router.get('/users', getAllUsers)

module.exports = router