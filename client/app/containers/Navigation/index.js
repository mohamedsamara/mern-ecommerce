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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import SearchBar from '../../components/Common/SearchBar';
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon, SearchIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';

class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands();
  }

  toggleBrand() {
    this.props.fetchStoreBrands();
    this.props.toggleBrand();
  }

  toggleMenu() {
    this.props.fetchStoreCategories();
    this.props.toggleMenu();
  }

  onChangeSearch(e) {
    if(e.value.length > 0){
      this.props.fetchSearchProducts(e.value)
      this.props.history.push(`/shop/search/${e.value}`)
    } else {
      this.props.fetchStoreProducts()
      this.props.history.push(`/shop`)
    }
  }

  onSubmitSearch(e) {
    if(e.value.length > 0){
      this.props.fetchSearchProducts(e.value)
      this.props.history.push(`/shop/search/${e.value}`)
    } else {
      this.props.fetchStoreProducts()
      this.props.history.push(`/shop`)
    }
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu
    } = this.props;

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
              md={{ size: 6, order: 1 }}
              lg={{ size: 3, order: 1 }}
            >
              <div className='brand'>
                <Button
                  borderless
                  variant='empty'
                  className='d-none d-md-block'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <Link to='/'>
                  <h1 className='logo'>MERN Store</h1>
                </Link>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 5, order: 4 }}
              >
              <SearchBar
              id= {'search'}
              name= {'search'}
              placeholder= {'Search'}
              inlineBtn= {true}
              btnText={''}
              btnIcon={<SearchIcon />}
              onSearch={e => this.onChangeSearch(e)}
              onSearchSubmit={e => this.onSubmitSearch(e)}
              />
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 6, order: 2 }}
              lg={{ size: 4, order: 4 }}
              className='desktop-hidden'
            >
              <div className='header-links'>
                <Button
                  borderless
                  variant='empty'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 3 }}
              sm={{ size: 12, order: 3 }}
              md={{ size: 6, order: 3 }}
              lg={{ size: 4, order: 4 }}
            >
              <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
                <CartIcon
                  className='d-none d-md-block'
                  cartItems={cartItems}
                  onClick={toggleCart}
                />
                <Nav navbar>
                  <Dropdown
                    nav
                    inNavbar
                    toggle={() => this.toggleBrand()}
                    isOpen={isBrandOpen}
                  >
                    <DropdownToggle nav>
                      Brands
                      <span className='fa fa-chevron-down dropdown-caret'></span>
                    </DropdownToggle>
                    <DropdownMenu right className='nav-brand-dropdown'>
                      <div className='mini-brand'>
                        <MiniBrand
                          brands={brands}
                          toggleBrand={() => this.toggleBrand()}
                        />
                      </div>
                    </DropdownMenu>
                  </Dropdown>
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
            className={
              isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
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
            className={
              isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
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
    brands: state.brand.storeBrands,
    authenticated: state.authentication.authenticated,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
