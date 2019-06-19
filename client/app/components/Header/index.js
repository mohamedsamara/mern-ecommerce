/**
 *
 * Header
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const Header = props => {
  const {} = props;

  return (
    <div>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>register</Link>
    </div>
  );
};

export default Header;
