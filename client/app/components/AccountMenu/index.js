/**
 *
 * AccountMenu
 *
 */

import React from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';

import Button from '../Button';

const AccountMenu = props => {
  const { isMenuOpen, accountLinks, toggleMenu } = props;

  return (
    <div className='panel-sidebar'>
      <Button
        text='Show Menu Panel'
        className={`btn-no-styles ${
          isMenuOpen ? 'menu-panel' : 'menu-panel collapse'
        }`}
        ariaExpanded={isMenuOpen ? 'true' : 'false'}
        // ariaLabel={isMenuOpen ? 'menu panel expanded' : 'menu panel collapse'}
        onClick={toggleMenu}
      />
      <h3 className='panel-title'>Account</h3>
      <Navbar color='light' light expand='xl'>
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
