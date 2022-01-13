import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";

const Navbar = () => {
  const { isLoggedIn, user, logOut } = useContext(UserContext);

  return (
    <nav>
      <Link to="/reviews">Reviews</Link>
      <Link to="/users">Users</Link>

      {isLoggedIn ? (
        <>
          <p>{`Hello ${user.username}`}</p>{" "}
          <button onClick={logOut}>LogOut</button>
          <Link to="/review_form">Add Review</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
