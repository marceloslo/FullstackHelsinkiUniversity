import { useState} from 'react'
//import blogService from '../services/blogs'

const Blog = ({blog, user, increaseLikes, handleDeletion}) => { 
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

  return (
  <div style={blogStyle} className='blog'>
    {blogToDisplay.title} { blogToDisplay.author} 
    <button style={hideInformation} onClick={ () => setVisible(true)}>view</button>
    <button style={showInformation} onClick={ () => setVisible(false)}>hide</button>
    <div style={showInformation} className='info'>
      <div>{blogToDisplay.url}</div>
      <div>likes {blogToDisplay.likes} <button onClick={() => increaseLikes({blog,setBlog})}>like</button></div>
      <div>{blogToDisplay.user.name}</div>
      <div><button style={isCreator} onClick={() => handleDeletion(blog)}>delete</button></div>
    </div>
  </div> 
  )
}

export default Blog