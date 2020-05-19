/*
 *
 * ResetPassword
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import actions from '../../actions';
import ResetPasswordForm from '../../components/ResetPasswordForm';

class ResetPassword extends React.PureComponent {
  handleResetPassowrd() {
    const token = this.props.match.params.token;
    this.props.resetPassowrd(token);
  }

  render() {
    const { authenticated, resetFormData, resetPasswordChange } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    return (
      <div className='forgot-password-form'>
        <h1>Reset Password</h1>
        <hr />
        <ResetPasswordForm
          resetFormData={resetFormData}
          resetPasswordChange={resetPasswordChange}
          resetPassowrd={() => this.handleResetPassowrd()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    resetFormData: state.resetPassword.resetFormData
  };
};

export default connect(mapStateToProps, actions)(ResetPassword);
