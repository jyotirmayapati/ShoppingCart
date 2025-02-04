import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = ({ cartItemCount }) => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Products</Link>
        {token && <Link to="/cart">Cart ({cartItemCount})</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
