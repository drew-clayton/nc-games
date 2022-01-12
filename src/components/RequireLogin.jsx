import { useContext } from "react";
import { UserContext } from "../contexts/user";
import LoginPage from "./LoginPage";

const RequireLogin = ({ children }) => {
  //   console.log("children at requireLogin:", children);
  const { isLoggedin } = useContext(UserContext);
  console.log("isLoggedin at requireLogin: ", isLoggedin);
  return isLoggedin ? children : <LoginPage />;
};
export default RequireLogin;
