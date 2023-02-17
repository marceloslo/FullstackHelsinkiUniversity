import { useState} from 'react'

const PostBlog = ({createBlog,blogFormRef}) => { 
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
    
    const handleSubmission = async (event) => {
      event.preventDefault()
      await createBlog({title,url,author})
      setTitle('')
      setAuthor('')
      setUrl('')
      if(blogFormRef !== undefined){
        blogFormRef.current.toggleVisibility()
      }
    }

    return(
      <form onSubmit={ handleSubmission}>
        <div>
          Title:
          <input type='text' placeholder='Title' name='Title' value={title} onChange={ ({target}) => setTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input type='text' placeholder='Author' name='Author' value={author} onChange={ ({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input type='text' placeholder='url' name='url' value={url} onChange={ ({target}) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    )
}

export default PostBlog