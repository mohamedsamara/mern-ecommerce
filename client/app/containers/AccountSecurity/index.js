/*
 *
 * AccountSecurity
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ResetPasswordForm from '../../components/Common/ResetPasswordForm';

class AccountSecurity extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      resetFormData,
      formErrors,
      resetPasswordChange,
      resetAccountPassword
    } = this.props;

    return (
      <div className='account-security'>
        <SubPage title={'Account Security'} isMenuOpen={null}>
          <div className='reset-form'>
            <h3>Reset Password</h3>
            <ResetPasswordForm
              resetFormData={resetFormData}
              formErrors={formErrors}
              resetPasswordChange={resetPasswordChange}
              resetPassword={resetAccountPassword}
            />
          </div>
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(AccountSecurity);
