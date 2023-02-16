import { useState} from 'react'
import blogService from '../services/blogs'

const PostBlog = ({ blogs,setBlogs,setErrorMessage,setSuccessMessage,user,blogFormRef}) => { 
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
    
    const handleSubmission = async (event) => { 
      event.preventDefault()
      try{ 
        const response = await blogService.create({ title,author,url})
        const newBlog = { ...response,'user':user}
        setBlogs(blogs.concat(newBlog))
        setSuccessMessage(`a new blog ${ response.title} by ${ author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
        blogFormRef.current.toggleVisibility()
        setTimeout(() => { 
          setSuccessMessage(null)
       }, 5000)
     } catch (exception) { 
        console.log(exception)
        setErrorMessage('Failed to add blog, check if all fields are filled')
        setTimeout(() => { 
          setErrorMessage(null)
       }, 5000)
     }
   }
  
    return(
      <form onSubmit={ handleSubmission}>
        <div>
          Title:
          <input type='text' name='Title' value={ title} onChange={ ({ target}) => setTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type='text' name='Author' value={ author} onChange={ ({ target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input type='text' name='url' value={ url} onChange={ ({ target}) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    )
}

export default PostBlog