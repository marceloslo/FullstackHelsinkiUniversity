import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Success from './components/Success'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const PostBlog = ({blogs,setBlogs,setErrorMessage,setSuccessMessage}) =>{
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  
  const handleSubmission = async (event)=>{
    event.preventDefault()
    try{
      const response = await blogService.create({title,author,url})
      setBlogs([...blogs,response])
      setSuccessMessage(`a new blog ${response.title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception){
      console.log(exception)
      setErrorMessage("Failed to add blog, check if all fields are filled")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <form onSubmit={handleSubmission}>
      <div>
        Title:
        <input type='text' name='Title' value={title} onChange={({target}) => setTitle(target.value)}/>
      </div>
      <div>
        Author:
        <input type='text' name='Author' value={author} onChange={({target}) => setAuthor(target.value)}/>
      </div>
      <div>
        url:
        <input type='text' name='url' value={url} onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
  )
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      setUser(user)
      setPassword('')
      setUsername('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
    } catch (exception){
      console.log('Invalid login')
      setErrorMessage(JSON.stringify("Wrong username or password"))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  //login components
  const LoginInfo = ()=>{
      return(
          <p>
              User {user.name} logged in
              <button type='button' 
                onClick={()=>{
                window.localStorage.removeItem('loggedBlogUser')
                window.location.reload(false)
                }}>
                Logout
              </button>
          </p>
      )
  }

  if (user===null){
    return (
      <div>
      <h1>Log in to application</h1>
      <Error message={errorMessage}/>
      <Success message={successMessage}/>
      <form onSubmit={handleLogin}>
      <div>
        Username:
        <input type='text' name='Username' value={username} onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
        Password:
        <input type='text' name='Password' value={password} onChange={({target}) => setPassword(target.value)}/>
      </div>
        <button type='submit'>Login</button>
      </form>
    </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Error message={errorMessage}/>
      <Success message={successMessage}/>
      <LoginInfo/>
      <h2>create new</h2>
      <PostBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App