import React from 'react';
import { Link } from 'react-router-dom';
function Header(props) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/registration'>Register</Link>
          </li>
          <li>
            <Link to='/chat'>Chat</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
