import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <Link to="/reviews">Reviews</Link>
      <Link to="/users">Users</Link>
      <Link to="/review_form">Add Review</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
