import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])

  const [infoMessage, setInfoMessage] = useState(null)
  const [className, setClassName] = useState(null)

  const blogFormRef = React.createRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setInfoMessage('wrong credentials')
      setClassName('error')
      setTimeout(() => {
        setInfoMessage(null)
        setClassName(null)
      }, 4000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          id='username'
          type="text"
          value={username}

          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        Password:
        <input
          id='password'
          type="password"
          value={password}

          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginbutton' type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Add new Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>Log Out</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={infoMessage} className={className} />
        <h1>LOGIN TO BLOGLIST</h1>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>BlogList-App</h2>

      <div>{user.name} logged in</div>
      <div>{logoutForm()}</div>
      <div>
        {blogForm()}
      </div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}



export default App