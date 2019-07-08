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
import ResetPasswordForm from '../../components/ResetPasswordForm';
import Checkbox from '../../components/Checkbox';
import SubPage from '../../components/SubPage';

class Account extends React.PureComponent {
  componentDidMount() {
    const userId = cookie.load('user');

    if (!this.props.user._id) {
      this.props.fetchProfile(userId);
    }
  }

  render() {
    const {
      profile,
      user,
      isFormOpen,
      accountChange,
      updateProfile,
      resetFormData,
      resetPasswordChange,
      toggleResetForm,
      resetAccountPassword
    } = this.props;

    return (
      <div className='account'>
        <SubPage title={'Account Page'} isMenuOpen={null} />
        <div className='info'>
          <p>{user.email}</p>
          {user.role !== 'ROLE_MEMBER' && <span>Admin</span>}
          {profile.is_subscribed && <span>Subscribed</span>}
        </div>
        <AccountDetails
          profile={profile}
          user={user}
          accountChange={accountChange}
          updateProfile={updateProfile}
        />
        <Checkbox
          id={'toggle'}
          label={'Reset Password'}
          checked={isFormOpen}
          toggleCheckboxChange={toggleResetForm}
        />
        <div className={isFormOpen ? 'reset-form-open' : 'reset-form-hidden'}>
          <div className='reset-form'>
            <h1>Reset Password</h1>
            <ResetPasswordForm
              resetFormData={resetFormData}
              resetPasswordChange={resetPasswordChange}
              resetPassowrd={resetAccountPassword}
            />
          </div>
          <div
            className={isFormOpen ? 'dark-overflow' : ''}
            onClick={toggleResetForm}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.account.profile,
    user: state.account.user,
    isFormOpen: state.account.isFormOpen,
    resetFormData: state.resetPassword.resetFormData
  };
};

export default connect(
  mapStateToProps,
  actions
)(Account);
