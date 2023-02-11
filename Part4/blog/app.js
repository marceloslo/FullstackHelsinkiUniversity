const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const {MONGODB_URI} = require('./utils/config')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app