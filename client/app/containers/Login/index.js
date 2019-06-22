/*
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import SignupProvider from '../../components/SignupProvider';

class Login extends React.PureComponent {
  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      isLoading
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    return (
      <div className='login-form'>
        {isLoading && (
          <div>
            <LoadingIndicator />
            <div className='popup-background' />
          </div>
        )}
        <h1>Login</h1>
        <hr />
        <Row>
          <Col xs='12' md='6' className='col-no-padding'>
            <Col xs='12' md='12'>
              <Input
                type={'text'}
                label={'Email Address'}
                name={'email'}
                placeholder={'Please Enter Your Email'}
                value={loginFormData.email}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                type={'password'}
                label={'Password'}
                name={'password'}
                placeholder={'Please Enter Your Password'}
                value={loginFormData.password}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
            </Col>
          </Col>
          <Col xs='12' md='6'>
            <SignupProvider />
          </Col>
        </Row>
        <hr />
        <div className='login-actions'>
          <button className='input-btn' type='submit' onClick={() => login()}>
            Login
          </button>
          <Link className='redirect-link' to={'/forgot-password'}>
            Forgot Password?
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    isLoading: state.login.isLoading
  };
};

export default connect(
  mapStateToProps,
  actions
)(Login);
