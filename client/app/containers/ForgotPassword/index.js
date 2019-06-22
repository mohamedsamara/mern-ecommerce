/*
 *
 * ForgotPassword
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';
import Input from '../../components/Input';

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      authenticated,
      forgotFormData,
      forgotPasswordChange,
      forgotPassowrd
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    return (
      <div className='forgot-password-form'>
        <h1>Forgot Password</h1>
        <hr />
        <Row>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Email Address'}
              name={'email'}
              placeholder={'Please Enter Your Email'}
              value={forgotFormData.email}
              onInputChange={(name, value) => {
                forgotPasswordChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='login-actions'>
          <button
            className='input-btn'
            type='submit'
            onClick={() => forgotPassowrd()}
          >
            Send Email
          </button>

          <Link className='redirect-link' to={'/login'}>
            Back to login
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData
  };
};

export default connect(
  mapStateToProps,
  actions
)(ForgotPassword);
