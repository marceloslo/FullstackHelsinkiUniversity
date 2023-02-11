const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request,response) =>{
    const {username, password, name} = request.body
    if(!password || password.length < 3){
        response.status(400).json({error:'password must have more than 3 characters'})
    }
    const passwordHash = await bcrypt.hash(password,10)
    const user = new User({username,name,passwordHash})
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/',async (request,response)=>{
    const users = await User.find({}).populate('blogs')
    response.status(200).json(users)
})

module.exports = userRouter