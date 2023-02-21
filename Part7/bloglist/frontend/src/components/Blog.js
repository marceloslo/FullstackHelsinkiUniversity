import { useState, useContext} from "react";
import { useQueryClient, useMutation } from "react-query";
import { Link } from "react-router-dom";
import blogService from '../services/blogs'
import UserContext from "../userContext";
import { Button } from "../Styles";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  //const [blog, setBlog] = useState(blog);
  const queryClient = useQueryClient()
  const [user,]= useContext(UserContext)

  const showInformation = visible ? { display: "" } : { display: "none" };
  const hideInformation = visible ? { display: "none" } : { display: "" };
  const likeMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs',blogs.map((b) => (b.id === blog.id ? { ...newBlog, user: blog.user } : b)).sort((a, b) => b.likes - a.likes))
    },
    onError: (exception) => {
      console.log(exception);
    }
  })

  const deleteMutation = useMutation(blogService.remove,{
    onSuccess: () => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs',blogs.filter(b => b.id !== blog.id))
    }
  })

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

  let isCreator = { display: "none" };
  if (user.username) {
    isCreator =
      user.username === blog.user.username
        ? { display: "" }
        : { display: "none" };
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <Button style={hideInformation} onClick={() => setVisible(true)}>
        view
      </Button>
      <Button style={showInformation} onClick={() => setVisible(false)}>
        hide
      </Button>
      <div style={showInformation} className="info">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <Button onClick={() => increaseLikes(blog)}>like</Button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <Button style={isCreator} onClick={() => deleteMutation.mutate(blog.id)}>
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
