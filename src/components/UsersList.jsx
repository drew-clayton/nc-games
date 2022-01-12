import { useState, useEffect } from "react";
import { getUsers } from "../utils/api";
import UserCard from "./UserCard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    return getUsers().then((res) => setUsers(res));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </div>
    </div>
  );
};

export default UsersList;
