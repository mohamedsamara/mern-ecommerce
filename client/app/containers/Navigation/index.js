/**
 *
 * Navigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Cart from '../Cart';
import Menu from '../NavigationMenu';
import { BagIcon } from '../../components/Icon';

class Navigation extends React.PureComponent {
  render() {
    const {
      authenticated,
      user,
      cartItems,
      signOut,
      isCartOpen,
      isMenuOpen,
      toggleCart,
      toggleMenu
    } = this.props;

    return (
      <header className='header fixed-mobile-header'>
        <div className='header-info'>
          <Container>
            <Row>
              <Col md='4' className='text-center info-col d-none d-md-block'>
                <i className='fa fa-truck' />
                <span>Free Shipping</span>
              </Col>
              <Col md='4' className='text-center info-col d-none d-md-block'>
                <i className='fa fa-credit-card' />
                <span>Payment Methods</span>
              </Col>
              <Col md='4' className='text-center info-col d-none d-md-block'>
                <i className='fa fa-phone' />
                <span>Call us 951-999-9999</span>
              </Col>
              <Col xs='12' className='text-center d-block d-md-none'>
                <i className='fa fa-phone' />
                <span> Need advice? Call us 951-999-9999</span>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className='top-header'>
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 3, order: 1 }}
            >
              <div className='brand'>
                <span className='bars-icon fa fa-bars' onClick={toggleMenu} />
                <Link to='/'>
                  <h1>MERN Store</h1>
                </Link>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 5, order: 3 }}
              className='desktop-hidden'
            >
              <div className='header-links'>
                <span className='bars-icon fa fa-bars' onClick={toggleMenu} />
                <span className='cart-icon' onClick={toggleCart}>
                  <BagIcon />
                  {cartItems.length > 0 && (
                    <span className='cart-badge'>{cartItems.length}</span>
                  )}
                </span>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 9, order: 3 }}
            >
              <Navbar color='light' light expand='md'>
                <span className='cart-icon' onClick={toggleCart}>
                  <BagIcon />
                  {cartItems.length > 0 && (
                    <span className='cart-badge'>{cartItems.length}</span>
                  )}
                </span>
                <Nav navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/brands'>
                      Brands
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/shop'>
                      Shop
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {user.profile && Object.keys(user.profile).length != 0
                          ? user.profile.firstName
                          : 'Welcome'}
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link to={'/dashboard'}>Dashboard</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <a className='log-out' onClick={signOut}>
                            Log Out
                          </a>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        Welcome!
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link to={'/login'}>Login</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={'/register'}>Sign Up</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* hidden cart drawer */}
        <div className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}>
          <div className='mini-cart'>
            <Cart />
          </div>
          <div
            className={isCartOpen ? 'dark-overflow' : ''}
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}>
          <div className='mini-menu'>
            <Menu />
          </div>
          <div
            className={isMenuOpen ? 'dark-overflow' : ''}
            onClick={toggleMenu}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    authenticated: state.authentication.authenticated,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Navigation);
