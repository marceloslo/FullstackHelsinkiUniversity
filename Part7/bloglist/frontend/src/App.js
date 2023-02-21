import { useEffect, useRef, useContext} from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import PostBlog from "./components/PostBlog";
import { useQuery } from 'react-query'
import UserContext from "./userContext";
import LoginInfo from "./components/LoginInfo";
import { login } from "./reducers/userReducer";
import LoginMenu from "./components/LoginMenu";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import BlogView from "./components/BlogView";
import Table from 'react-bootstrap/Table';
import { Nav, Navbar } from "react-bootstrap";
import { BlogLi, BlogUl } from "./Styles";


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link to='/' style={padding}>Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to='/users' style={padding}>Users</Link>
        </Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Home = ({blogs,blogFormRef}) => {
  return (
    <>
      <Togglable buttonLabel="create note" ref={blogFormRef}>
        <h2>create new</h2>
        <PostBlog blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
        key={blog.id}
        blog={blog}
        />
      ))}
    </>
  )
}

const Users = ({blogs}) => {
  const users = {}
  for(var blog of blogs){
    if(!users[blog.user.id]){
      users[blog.user.id]={}
      users[blog.user.id].count = 0
      users[blog.user.id].name = blog.user.name
    }
    users[blog.user.id].count+=1
  }
  return (
    <>
    <h1>Users</h1>
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(users).map(user => <tr key={user}><td><Link to={`/users/${user}`}>{users[user].name}</Link></td><td>{users[user].count}</td></tr>)}
      </tbody>
    </Table>
    </>
  )
}

const User = ({blogs}) => {
  const match = useMatch('/users/:id')
  const blogsFromUser = match ? blogs.filter(blog => blog.user.id === match.params.id) : null
  if(blogsFromUser===null || blogsFromUser.length === 0){
    return null
  }
  return (
  <>
    <h1>{blogsFromUser[0].user.name}</h1>
    <h2>Added blogs</h2>
    <BlogUl>
      {blogsFromUser.map(blog => <BlogLi key={blog.id}>{blog.title}</BlogLi>)}
    </BlogUl>
  </>
  )
}

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const userLogin = JSON.parse(loggedUserJSON);
      userDispatch(login(userLogin));
      blogService.setToken(userLogin.token);
    }
  }, []);
  

  const result = useQuery('blogs', () => blogService.getAll().then((blogs) => blogs.sort((a, b) => b.likes - a.likes)))
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const blogs = result.data

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <LoginMenu/>
      </div>
    );
  }
  return (
      <div className="container">
        <Menu/>
        <h2>blogs</h2>
        <Notification />
        <LoginInfo />
        <Routes>
          <Route element={<Home blogFormRef={blogFormRef} blogs={blogs}/>} path='/'/>
          <Route element={<Users blogs={blogs}/>} path='/users'/>
          <Route element={<User blogs={blogs}/>} path='/users/:id'/>
          <Route element={<BlogView blogs={blogs}/>} path='/blogs/:id'/>
        </Routes>
      </div>
  );
};

export default App;
