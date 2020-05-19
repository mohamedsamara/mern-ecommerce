/**
 *
 * AccountMenu
 *
 */

import React from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';

const AccountMenu = props => {
  const { isMenuOpen, accountLinks, toggleMenu } = props;

  return (
    <div className='panel-sidebar'>
      <h3
        className={isMenuOpen ? 'menu-panel' : 'menu-panel collapse'}
        onClick={toggleMenu}
      >
        Show Menu Panel
      </h3>
      <h3 className='panel-title'>Account</h3>
      <Navbar color='light' light expand='lg'>
        <Collapse isOpen={isMenuOpen} navbar>
          <ul className='panel-links'>
            {accountLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={'/dashboard' + link.to}
                  activeClassName='active-link'
                  exact
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AccountMenu;
