/**
 *
 * NavigationMenu
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class NavigationMenu extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { isMenuOpen, categories, toggleMenu } = this.props;

    return (
      <div className='navigation-menu'>
        <Container>
          <div className='menu-header'>
            <h1>MERN Store</h1>
            {isMenuOpen && <span className='close-icon' onClick={toggleMenu} />}
          </div>
          <div className='menu-body'>
            <ul className='menu-list'>
              {categories.map((link, index) => (
                <li key={index} className='menu-item'>
                  <NavLink
                    to={'/shop/category/' + link.slug}
                    activeClassName='active-link'
                    exact
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.category.categories
  };
};

export default connect(mapStateToProps, actions)(NavigationMenu);
