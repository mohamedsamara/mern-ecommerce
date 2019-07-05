/**
 *
 * NavigationMenu
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { Link } from 'react-router-dom';

class NavigationMenu extends React.PureComponent {
  render() {
    const {} = this.props;

    return <div className='navigation-menu'>Test</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(NavigationMenu);
