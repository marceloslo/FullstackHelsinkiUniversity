const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

api = supertest(app)

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash(helper.defaultUser.password, 10)
    const user = new User({ username: helper.defaultUser.username, passwordHash })
    await user.save()
    const login = await api.post('/api/login').send(helper.defaultUser)
    token = login.body.token
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({...blog,user:login.body.id})
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
  .set('Authorization', `Bearer ${token}`)
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
  const response = await api.post('/api/blogs')
  .send(newBlog)
  .set('Authorization', `Bearer ${token}`)
  .expect(201).expect('Content-Type', /application\/json/)
  expect(response.body.likes).toBe(0)
})

test('missing title is detected', async () => {
  const newBlog ={
    "author": "My Friend",
    "url": "bloguer.com"
    }
  await api.post('/api/blogs')
  .send(newBlog)
  .set('Authorization', `Bearer ${token}`)
  .expect(400)
})

test('missing url is detected', async () => {
  const newBlog ={
    "title": "My blog",
    "author": "My Friend"
    }
  await api.post('/api/blogs')
  .send(newBlog)
  .set('Authorization', `Bearer ${token}`)
  .expect(400)
})

test('blog post is deleted', async () =>{
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
  }
  const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
  const id = response.body.id

  const oldblogs = await api.get('/api/blogs')
  expect(oldblogs.body).toHaveLength(helper.initialBlogs.length+1)

  await api.delete(`/api/blogs/${id}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(204)

  const newblogs = await api.get('/api/blogs')
  expect(newblogs.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post is updated', async () =>{
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
  }
  const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
  const id = response.body.id
  const updatedBlog ={...response.body,likes:100}
  const updated = await api.put(`/api/blogs/${id}`).send(updatedBlog).set('Authorization', `Bearer ${token}`)
  .expect(200).expect('Content-Type', /application\/json/)
  expect(updated.body.likes).toBe(100)
})

test('blog post without token fails', async () =>{
  const newBlog ={
    "title": "Blog with no likes",
    "author": "My Friend",
    "url": "bloguer.com"
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(401)
  expect(response.body.error).toContain('invalid token')
})


afterAll(async () => {
  await mongoose.connection.close()
})