import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logOut = () => {
    setUser({});
  };
  const isLoggedIn = !!user.username;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logOut,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
