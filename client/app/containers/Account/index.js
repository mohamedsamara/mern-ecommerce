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

    // if (!this.props.user._id) {
    this.props.fetchProfile(userId);
    // }
  }

  render() {
    const {
      profileData,
      user,
      isFormOpen,
      accountChange,
      updateProfile,
      resetFormData,
      formErrors,
      resetPasswordChange,
      toggleResetForm,
      resetAccountPassword
    } = this.props;

    return (
      <div className='account'>
        <SubPage title={'Account Page'} isMenuOpen={null}>
          <AccountDetails
            profileData={profileData}
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
                formErrors={formErrors}
                resetPasswordChange={resetPasswordChange}
                resetPassowrd={resetAccountPassword}
              />
            </div>
            <div
              className={isFormOpen ? 'dark-overflow' : ''}
              onClick={toggleResetForm}
            />
          </div>
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileData: state.account.profileData,
    user: state.account.user,
    isFormOpen: state.account.isFormOpen,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(Account);
