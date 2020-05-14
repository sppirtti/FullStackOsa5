const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [

  {
    title: 'nimi',
    author: 'a',
    url: 'a.fi',
    likes: 25
  },

  {
    title: 'bnimi',
    author: 'b',
    url: 'b.fi',
    likes: 100
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('Blog can be added', async () => {
  const newBlog = {
    title: 'Toimintaa',
    author: 'Test Ester',
    url: 'Koodintesti.fi',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})


test('If likes UNDEF, likes set to zero', async () => {

  const newBlog = {
    title: 'ARPAA',
    author: 'veikkaus',
    url: 'veikkaus.fi'
  
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[2].author).toBe('veikkaus')
  expect(response.body[2].likes).toBe(0)

})



afterAll(() => {
  mongoose.connection.close()
})

