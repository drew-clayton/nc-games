import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // const logOut = () => {
  //   setUser({});
  // };

  console.log("user at userContext", user);
  const isLoggedIn = !!user.username;
  console.log("isLoggedIn at userContext", isLoggedIn);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
