import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({ username });
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
      </form>
    </>
  );
};

export default LoginPage;
