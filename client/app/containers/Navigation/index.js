/**
 *
 * Navigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
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
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
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


  getSuggestionValue(suggestion){
    return suggestion.name;
  }


  renderSuggestion(suggestion,{ query, isHighlighted }){

    const BoldName = (suggestion,query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);
  
      return (
        <span>
        {parts.map((part, index) => {
          const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>);
    }

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <span className="sugg-option">
            <span className="icon-wrap"><img src={suggestion.imageUrl} /></span>
             <Container>
              <Row>
                <Col><span className="name">{BoldName(suggestion,query)}</span></Col>
              </Row>
              <Row>
                <Col><span className="price">${suggestion.price}</span></Col>
              </Row>
             </Container>
        </span>
      </Link>
    );
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
      toggleMenu,
      value,
      suggestions,
      onChange,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const inputProps = {
        placeholder: 'Search',
        value,
        onChange: onChange
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
              <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={(value) => { onSuggestionsFetchRequested({value})}}
                  onSuggestionsClearRequested={() => { onSuggestionsClearRequested()}}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}
                  onSuggestionSelected={(e,selectedValue)=>{
                    history.push(`/product/${selectedValue.suggestion.slug}`)
                  }}
              />
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
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 9, order: 3 }}
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
    user: state.account.user,
    value:state.navigation.value,
    suggestions:state.navigation.suggestions
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
