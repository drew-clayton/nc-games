import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    return getUsers().then((res) => setUsers(res));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      users
        .map((obj) => {
          return obj.username;
        })
        .includes(username)
    ) {
      setUser({ username });
      navigate(-1);
    } else {
      setNewUser(true);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </label>
        <button>Login</button>
        {newUser ? <p>"not a user</p> : null}
      </form>
    </>
  );
};

export default LoginPage;
