/**
 *
 * Navigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import Header from '../../components/Header';

export class Navigation extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { isMenuOpen, toggleMenu, signOut, user } = this.props;

    return (
      <Header
        user={user}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        signOut={signOut}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen
  };
};

export default connect(
  mapStateToProps,
  actions
)(Navigation);
