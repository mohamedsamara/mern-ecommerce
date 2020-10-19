/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Admin from '../Admin';
import Customer from '../Customer';
import LoadingIndicator from '../../components/LoadingIndicator';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { user, isLoading } = this.props;

    return (
      <>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : user.role === 'ROLE_MEMBER' ? (
          <Customer />
        ) : (
          <Admin />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
