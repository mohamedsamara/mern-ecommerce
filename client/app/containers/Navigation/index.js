/**
 *
 * Navigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Link, NavLink as ActiveLink, withRouter } from 'react-router-dom';

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

import actions from '../../actions';

import Button from '../../components/Button';
import CartIcon from '../../components/CartIcon';
import { BarsIcon } from '../../components/Icon';
import MiniBrand from '../../components/MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';

class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      signOut,
      isCartOpen,
      isMenuOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      toggleBrand
    } = this.props;

    const handleMouseEnter = () => {
      toggleBrand(true);
    };

    const handleMouseLeave = () => {
      toggleBrand(false);
    };

    return (
      <header className='header fixed-mobile-header'>
        <div className='header-info'>
          <Container>
            <Row>
              <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-truck' />
                <span>Free Shipping</span>
              </Col>
              <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-credit-card' />
                <span>Payment Methods</span>
              </Col>
              <Col md='4' className='text-center d-none d-md-block'>
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
                <Button
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  className='btn-no-styles'
                  onClick={toggleMenu}
                />
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
                <Button
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  className='btn-no-styles'
                  onClick={toggleMenu}
                />
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 9, order: 3 }}
            >
              <Navbar color='light' light expand='md'>
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
                <Nav navbar>
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/brands'
                      className={isBrandOpen ? 'brand-link-mouseover' : ''}
                      activeClassName='active'
                      onMouseEnter={handleMouseEnter}
                    >
                      Brands
                    </NavLink>
                    <div
                      className={
                        isBrandOpen ? 'mini-brand-open' : 'hidden-mini-brand'
                      }
                    >
                      <div className='mini-brand'>
                        <div className='extended-margin'></div>
                        <div className='mini-brand-container'>
                          <MiniBrand brands={brands} />
                        </div>
                      </div>
                      <div
                        className={isBrandOpen ? 'dark-overflow' : ''}
                        onMouseEnter={handleMouseLeave}
                      />
                    </div>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/shop'
                      activeClassName='active'
                    >
                      Shop
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {user.firstName ? user.firstName : 'Welcome'}
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push('/dashboard')}
                        >
                          Dashboard
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        Welcome!
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => history.push('/login')}>
                          Login
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/register')}>
                          Sign Up
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
        <div
          className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className='mini-cart'>
            <Cart />
          </div>
          <div
            className={isCartOpen ? 'dark-overflow' : ''}
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
          aria-hidden={`${isMenuOpen ? false : true}`}
        >
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
    isBrandOpen: state.navigation.isBrandOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.brands,
    authenticated: state.authentication.authenticated,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
