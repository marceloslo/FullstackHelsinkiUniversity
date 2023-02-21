import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useMatch } from "react-router-dom"
import blogService from "../services/blogs"
import { Button } from "../Styles"

const BlogView = ({blogs}) => {
    const match = useMatch('/blogs/:id')
    const [newComment,setComment] = useState('')
    const [comments,setComments] = useState([])
    const queryClient = useQueryClient()
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null
    const likeMutation = useMutation(blogService.update, {
        onSuccess: (newBlog) => {
          const blogs = queryClient.getQueryData('blogs')
          queryClient.setQueryData('blogs',blogs.map((b) => (b.id === blog.id ? { ...newBlog, user: blog.user } : b)).sort((a, b) => b.likes - a.likes))
        },
        onError: (exception) => {
          console.log(exception);
        }
    })

    useEffect(() => {
      if(blog.comments){
        setComments(blog.comments)
      }
    },[blog])

    if(blog === null){
      return null
    }

    const increaseLikes = (blog) => {
        const updatedBlog = {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          likes: blog.likes + 1,
          author: blog.author,
          user: blog.user.id,
        }
        likeMutation.mutate(updatedBlog)
    }

    const addComment = async () => {
      await blogService.comment({id:match.params.id,comment:newComment})
      setComments(comments.concat({content:newComment}))
      setComment('')
    }

    return(
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes{" "}
        <Button onClick={() => increaseLikes(blog)}>like</Button></div>
        <div>added by {blog.user.name}</div>
        <h2>comments</h2>
        <input type='text' onChange={(event) => setComment(event.target.value)} value={newComment}/>
        <Button onClick={() => addComment()}>new comment</Button>
        <ul>
          {comments ? comments.map(comment => <li key={comment.content}>{comment.content}</li>) : null}
        </ul>
      </div>
    )
}

export default BlogView