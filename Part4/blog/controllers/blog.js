const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    let newBlog = request.body
    if(!("likes" in newBlog)){
        newBlog = {...newBlog,"likes":0}
    }
    const blog = new Blog(newBlog)
    try{
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error){
        response.status(400).json(error.errors)
    }
})

blogRouter.delete('/:id',async (request,response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id',async (request,response) => {
    const updated = await Blog.findByIdAndUpdate(request.params.id,request.body,{"new" : true,"runValidators":true})
    response.json(updated)
})

module.exports = blogRouter