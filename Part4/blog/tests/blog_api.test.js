const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


test('Id property is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('Post works', async () =>{
  const newBlog ={
  "title": "New blog",
  "author": "Me",
  "url": "blog.blog.blog",
  "likes": 2
  }
  await api.post('/api/blogs').send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain('New blog')

})

test('likes default to 0', async () => {
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
    }
  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  expect(response.body.likes).toBe(0)
})

test('missing title is detected', async () => {
  const newBlog ={
    "author": "My Friend",
    "url": "bloguer.com"
    }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('missing url is detected', async () => {
  const newBlog ={
    "title": "My blog",
    "author": "My Friend"
    }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('blog post is deleted', async () =>{
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const id = response.body.id

  const oldblogs = await api.get('/api/blogs')
  expect(oldblogs.body).toHaveLength(helper.initialBlogs.length+1)

  await api.delete(`/api/blogs/${id}`).expect(204)

  const newblogs = await api.get('/api/blogs')
  expect(newblogs.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post is updated', async () =>{
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const id = response.body.id

  const updatedBlog ={...newBlog,likes:100}
  const updated = await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200).expect('Content-Type', /application\/json/)
  expect(updated.body.likes).toBe(100)
})

afterAll(async () => {
  await mongoose.connection.close()
})