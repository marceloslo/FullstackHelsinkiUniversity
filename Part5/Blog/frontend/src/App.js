import { useState, useEffect , useRef} from 'react'
import Blog from './components/Blog'
import Success from './components/Success'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PostBlog from './components/PostBlog'


const App = () => { 
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

  useEffect(() => { 
    blogService.getAll().then(blogs => { 
        setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
     }
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

  const handleLogin = async (event) => { 
    event.preventDefault()
    try{ 
      const user = await loginService.login({ username,password})
      setUser(user)
      setPassword('')
      setUsername('')
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
   } catch (exception){ 
      console.log('Invalid login')
      setErrorMessage(JSON.stringify('Wrong username or password'))
      setTimeout(() => { 
        setErrorMessage(null)
     }, 5000)
   }
 }


  //login components
  const LoginInfo = () => { 
      return(
          <p>
              User { user.name} logged in
              <button type='button' 
                onClick={ () => { 
                window.localStorage.removeItem('loggedBlogUser')
                window.location.reload(false)
               }}>
                Logout
              </button>
          </p>
      )
 }

  const blogFormRef = useRef()

  if (user===null){ 
    return (
      <div>
      <h1>Log in to application</h1>
      <Error message={ errorMessage}/>
      <Success message={ successMessage}/>
      <form onSubmit={ handleLogin}>
      <div>
        Username:
        <input type='text' name='Username' value={ username} onChange={ ({ target}) => setUsername(target.value)}/>
      </div>
      <div>
        Password:
        <input type='text' name='Password' value={ password} onChange={ ({ target}) => setPassword(target.value)}/>
      </div>
        <button type='submit'>Login</button>
      </form>
    </div>
    )
 }
  return (
    <div>
      <h2>blogs</h2>
      <Error message={ errorMessage}/>
      <Success message={ successMessage}/>
      <LoginInfo/>
      <Togglable buttonLabel='create note' ref={ blogFormRef}>
        <h2>create new</h2>
        <PostBlog blogs={ blogs} setBlogs={ setBlogs} setErrorMessage={ setErrorMessage} setSuccessMessage={ setSuccessMessage} user={ user} blogFormRef={ blogFormRef}/>
      </Togglable>
      { 
        blogs.map(blog => 
        <Blog key={ blog.id} blog={ blog} blogs={ blogs} setBlogs={ setBlogs} user={ user}/>
      )}

    </div>
  )
}

export default App