import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import blogService from "../services/blogs"
import { useContext } from "react";
import NotificationContext from "../notificationContext";
import {reset,success,error} from "../reducers/notificationReducer"
import UserContext from "../userContext";
import { Button } from "../Styles";

const PostBlog = ({ blogFormRef }) => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext);
  const [user,] = useContext(UserContext)
  const createMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs',blogs.concat({...newBlog,user:user}))
      notificationDispatch(success(`a new blog ${newBlog.title} by ${author} added`));
      setTimeout(() => {
        notificationDispatch(reset());
      }, 5000);
    },
    onError: (exception) => {
      console.log(exception);
      notificationDispatch(error("Failed to add blog, check if all fields are filled"));
      setTimeout(() => {
        notificationDispatch(reset());
      }, 5000);
    }
  })
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmission = async (event) => {
    event.preventDefault();
    createMutation.mutate({ title, url, author });
    setTitle("");
    setAuthor("");
    setUrl("");
    if (blogFormRef !== undefined) {
      blogFormRef.current.toggleVisibility();
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <div>
        Title:
        <input
          type="text"
          placeholder="Title"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          placeholder="Author"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          placeholder="url"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit">create</Button>
    </form>
  );
};

export default PostBlog;
