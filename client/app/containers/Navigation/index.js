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

class Navigation extends React.PureComponent {
  render() {
    const {
      authenticated,
      user,
      cart,
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
              <Col
                xs='4'
                md='4'
                className='text-center info-col d-none d-sm-block'
              >
                <i className='fa fa-truck' />
                <span>Free Shipping</span>
              </Col>
              <Col
                xs='4'
                md='4'
                className='text-center info-col d-none d-sm-block'
              >
                <i className='fa fa-credit-card' />
                <span>Payment Methods</span>
              </Col>
              <Col
                xs='4'
                md='4'
                className='text-center info-col d-none d-sm-block'
              >
                <i className='fa fa-phone' />
                <span>Call us 951-999-9999</span>
              </Col>
              <Col xs='12' className='text-center d-block d-sm-none'>
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
                <h1>
                  <Link to='/'>MERN Store</Link>
                </h1>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 3 }}
              className='col-no-padding'
            >
              <div className='header-links'>
                <span className='bars-icon fa fa-bars' onClick={toggleMenu} />
                <span className='fa fa-cart-plus' onClick={toggleCart}>
                  {cart.length > 0 && (
                    <span className='cart-badge'>{cart.length}</span>
                  )}
                </span>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 3, order: 3 }}
            >
              <Navbar color='light' light expand='md'>
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
                      <DropdownToggle nav caret>
                        {Object.keys(user).length == 0
                          ? 'Welcome'
                          : user.profile.firstName}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link to={'/dashboard'}>Dashboard</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <span className='log-out' onClick={signOut}>
                            Log Out
                          </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Welcome!
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link to={'/login'}>Login</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={'/register'}>SignUp</Link>
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
    cart: state.cart.cartItems,
    authenticated: state.authentication.authenticated,
    user: state.account.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(Navigation);
