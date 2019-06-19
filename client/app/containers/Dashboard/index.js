/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

class Dashboard extends React.PureComponent {
  componentDidMount() {}

  render() {
    return <div className='dashboard'>This is Dashboard</div>;
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
)(Dashboard);
