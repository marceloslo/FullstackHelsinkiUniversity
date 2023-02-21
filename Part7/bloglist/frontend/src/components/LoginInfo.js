import { useContext } from "react";
import { Button } from "../Styles";
import UserContext from "../userContext";

//login components
const LoginInfo = () => {
    const [user,] = useContext(UserContext)
    return (
      <p>
        User {user.name} logged in
        <Button
          type="button"
          onClick={() => {
            window.localStorage.removeItem("loggedBlogUser");
            window.location.reload(false);
          }}
        >
          Logout
        </Button>
      </p>
    );
};

export default LoginInfo