import { useContext, useState } from "react";
import NotificationContext from "../notificationContext";
import UserContext from "../userContext";
import { error, reset } from "../reducers/notificationReducer";
import loginService from '../services/login';
import blogService from '../services/blogs';
import { login } from "../reducers/userReducer";
import { Form, Button } from 'react-bootstrap'

const LoginMenu = () => {
    const [, notificationDispatch] = useContext(NotificationContext);
    const [, userDispatch] = useContext(UserContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const user = await loginService.login({ username, password });
          userDispatch(login(user));
          setPassword("");
          setUsername("");
          blogService.setToken(user.token);
          window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
        } catch (exception) {
          console.log("Invalid login");
          notificationDispatch(error("Wrong username or password"));
          setTimeout(() => {
            notificationDispatch(reset());
          }, 5000);
        }
      };
    

    return (
        <Form onSubmit={handleLogin}>
          <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit">Login</Button>
          </Form.Group>
        </Form>
    )
}

export default LoginMenu