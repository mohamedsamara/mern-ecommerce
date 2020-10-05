/**
 *
 * NavigationMenu
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import Button from '../../components/Button';
import { CloseIcon } from '../../components/Icon';

class NavigationMenu extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { isMenuOpen, categories, toggleMenu } = this.props;

    const handleCategoryClick = () => {
      this.props.toggleMenu();
    };

    return (
      <div className='navigation-menu'>
        <Container>
          <div className='menu-header'>
            <h1 className='logo'>MERN Store</h1>
            {isMenuOpen && (
              <Button
                className='btn-no-styles'
                ariaLabel='close the menu'
                icon={<CloseIcon />}
                onClick={toggleMenu}
              />
            )}
          </div>
          <div className='menu-body'>
            <nav role='navigation'>
              <ul className='menu-list'>
                {categories.map((link, index) => (
                  <li key={index} className='menu-item'>
                    <NavLink
                      onClick={handleCategoryClick}
                      to={'/shop/category/' + link.slug}
                      activeClassName='active-link'
                      exact
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
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
