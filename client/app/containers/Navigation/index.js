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
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import Cart from '../Cart';

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
              <Col xs='6' md='4' className='text-center'>
                <i className='fa fa-truck' /> <span>Free Shipping</span>
              </Col>
              <Col xs='6' md='4' className='text-center'>
                <i className='fa fa-credit-card' />
                <span>Payment Methods</span>
              </Col>
              <Col xs='12' md='4' className='text-center info-col'>
                <i className='fa fa-phone' />
                <span>Call us 951-999-9999</span>
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
              className='text-center'
            >
              <h1 className='brand'>
                <Link to='/'>MERN Store</Link>
              </h1>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 3 }}
            >
              <div className='header-links'>
                <span className='bars-icon' onClick={toggleMenu} />
                <span
                  className={isCartOpen ? 'close-cart' : 'fa fa-cart-plus'}
                  onClick={toggleCart}
                >
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
                <Collapse isOpen={isMenuOpen} navbar>
                  <Nav className='ml-auto' navbar>
                    {authenticated ? (
                      <Nav navbar>
                        <NavItem>
                          <NavLink>{user}</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink tag={Link} to='/dashboard'>
                            Dashboard
                          </NavLink>
                        </NavItem>
                        <NavItem className='log-out'>
                          <NavLink onClick={signOut}>Log Out</NavLink>
                        </NavItem>
                      </Nav>
                    ) : (
                      <Nav navbar>
                        <NavItem>
                          <NavLink tag={Link} to='/login'>
                            Login
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink tag={Link} to='/register'>
                            SignUp
                          </NavLink>
                        </NavItem>
                      </Nav>
                    )}
                  </Nav>
                </Collapse>
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
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    cart: state.cart.cartItems,
    authenticated: state.authentication.authenticated
  };
};

export default connect(
  mapStateToProps,
  actions
)(Navigation);
