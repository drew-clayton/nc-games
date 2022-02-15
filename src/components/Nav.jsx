import { useContext,useState  } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import { slide as Menu } from 'react-burger-menu'


const Navbar = () => {
  const { isLoggedIn, user, logOut } = useContext(UserContext);
  const [menuState, setMenuState] = useState(false);

   function closeMenu (event) {
    setMenuState(false)
  }

  function handleStateChange (state) {
    setMenuState(state.isOpen);
  }
  
  return (
    <nav
      className="flex justify-between items-center h-16 bg-blue-200 text-black shadow-sm font-mono sticky top-0 z-50"
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
        <Menu disableAutoFocus right styles={ styles } isOpen={menuState} onStateChange={(state) => handleStateChange(state)}>
          
        <Link
          className="rounded-lg px-3 py-1 transition duration-500 hover:bg-gray-100 hover:text-gray-900"
          to="/reviews" onClick={() => closeMenu()}
        >
          Reviews
        </Link>
        {isLoggedIn ? (
          <>
             <Link
              className="bm-item rounded-lg px-3 py-1 transition duration-500 hover:bg-gray-100 hover:text-gray-900"
              to="/review_form" onClick={() => closeMenu()}
            >
              Add Review
            </Link>        
            <br/>
        <button  className="rounded-lg px-3 py-1 transition duration-500 hover:bg-gray-100 hover:text-gray-900" onClick={() => {logOut();closeMenu()}}>LogOut</button>
        </>
        ) : (
          <Link
          className="rounded-lg px-3 py-1  transition duration-500 hover:bg-gray-100 hover:text-gray-900"
          to="/login" onClick={() => closeMenu()}
        >
          Login
        </Link>
        )}
        </Menu>
      </div>
      <nav className="pr-8 md:block hidden">
        <Link
          className="rounded-lg px-3 py-1 transition duration-500 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
          to="/reviews"
        >
          Reviews
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              className="rounded-lg px-3 py-1 transition duration-500 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
              to="/review_form"
            >
              Add Review
            </Link>
            <button className="rounded-lg px-3 py-1  transition duration-500 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4" onClick={logOut}>LogOut</button>
          </>
        ) : (
          <>
            <Link
              className="rounded-lg px-3 py-1  transition duration-500 hover:bg-gray-100 hover:text-gray-900 focus:underline decoration-2 underline-offset-4"
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

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    right: '10px',
    width: '30px',
    height: '20px',
    top: '24px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    height: '20%'
  },
  bmMenu: {
    background: '#2a2a2c',
    padding: '1em',
    fontSize: 20
  },
  bmItemList: {
    color: '#b8b7ad',
  },
  bmItem: {
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export default Navbar;
