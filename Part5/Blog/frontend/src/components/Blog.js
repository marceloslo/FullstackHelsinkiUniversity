import { useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,blogs,setBlogs,user}) => { 
  const [visible,setVisible] = useState(false)
  const [blogToDisplay,setBlog] = useState(blog)

  const showInformation = visible ? { display:''} : { display:'none'}
  const hideInformation = visible ? { display:'none'} : { display:''} 

  const isCreator = (user.username === blog.user.username) ? { display:''} : { display:'none'}

  const blogStyle = { 
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
 }

  const increaseLikes = async () => { 
    try{ 
      const updatedBlog = { 'id':blogToDisplay.id,'title':blogToDisplay.title,'url':blogToDisplay.url,'likes':blogToDisplay.likes+1,'author':blogToDisplay.author,'user':blogToDisplay.user.id}
      const response = await blogService.update(updatedBlog)
      setBlog({ ...response,'user':blog.user})
      setBlogs(blogs.map(b => (b.id===blog.id ? { ...response,'user':blog.user} : b)).sort((a,b) => b.likes-a.likes))
   }
    catch(exception){ 
      console.log(exception)
   }
 }

  const handleDeletion = async () => { 
    try{ 
      const confirm = window.confirm(`Remove blog ${ blog.title}?`)
      if(confirm){ 
        const response = await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id!==blog.id))
     }
   }
    catch(exception){ 
      console.log(exception)
   }
 }

  return (
  <div style={ blogStyle}>
    { blogToDisplay.title} { blogToDisplay.author} 
    <button style={ hideInformation} onClick={ () => setVisible(true)}>view</button>
    <button style={ showInformation} onClick={ () => setVisible(false)}>hide</button>
    <div style={ showInformation}>
      <div>{ blogToDisplay.url}</div>
      <div>likes { blogToDisplay.likes} <button onClick={ increaseLikes}>like</button></div>
      <div>{ blogToDisplay.user.name}</div>
      <div><button style={ isCreator} onClick={ handleDeletion}>delete</button></div>
    </div>
  </div> 
  )
}

export default Blog