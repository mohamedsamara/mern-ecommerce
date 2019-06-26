/*
 *
 * Account
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import cookie from 'react-cookies';

import actions from '../../actions';

import AccountDetails from '../../components/AccountDetails';

class Account extends React.PureComponent {
  componentWillMount() {
    const userId = cookie.load('user');
    this.props.fetchProfile(userId);
  }

  render() {
    const { profile, user, accountChange, updateProfile } = this.props;

    return (
      <div className='account'>
        <h1>Account Page</h1>

        <div className='info'>
          <p>{user.email}</p>
          {user.role !== 'ROLE_MEMBER' && <span>Admin</span>}
        </div>
        <AccountDetails
          profile={profile}
          user={user}
          accountChange={accountChange}
          updateProfile={updateProfile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.account.profile,
    user: state.account.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(Account);
