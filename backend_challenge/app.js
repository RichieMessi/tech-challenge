const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

mongoose.connect(`mongodb://localhost/Mavennet`, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.warn(`MONGODB CONNECTED`))
mongoose.connection.on('error', err => console.warn(`Error occoured - Error Name - ${err}`))
mongoose.set('useFindAndModify', false);



const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const albumRoutes = require('./routes/album')

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', albumRoutes)


const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
    res.send('done')
})


app.listen(PORT, () => console.warn(`Listening on port ${PORT}`))