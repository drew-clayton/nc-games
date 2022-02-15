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
    <div className="w-100 h-auto p-10 mt-50 mx-auto relative max-w-md">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    <div className="mb-4">
      <input value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" aria-label="Username"></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign In
      </button>
    </div>
  </form>
  {newUser && <p className="text-red-600">*Not a valid username.... try 'jessjelly'</p>}
</div>

  );
};

export default LoginPage;
