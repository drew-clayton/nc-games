import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";

const Navbar = () => {
  const { isLoggedIn, user, logOut } = useContext(UserContext);
  return (
    <nav
      className="flex justify-between items-center h-16 bg-blue-100 text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <Link className="pl-8 font-mono" to="/">
        NC Game Reviews
      </Link>
      {isLoggedIn && (
        <Link className="pl-8 font-mono text-green-600" to="/">
          👋 {user.username}
        </Link>
      )}

      <div className="px-4 cursor-pointer md:hidden">
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
          ></path>
        </svg>
      </div>
      <nav className="pr-8 md:block hidden">
        <Link
          className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
          to="/reviews"
        >
          Reviews
        </Link>
        <Link
          className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
          to="/users"
        >
          Users
        </Link>
        <Link
          className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
          to="/"
        >
          Categories
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
              to="/review_form"
            >
              Add Review
            </Link>
            <button onClick={logOut}>LogOut</button>
          </>
        ) : (
          <>
            <Link
              className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
              to="/"
            >
              Sign Up
            </Link>
            <Link
              className="rounded-lg px-3 py-1 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
              to="/login"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </nav>
  );
};

export default Navbar;
