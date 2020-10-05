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
import Button from '../../components/Button';

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      authenticated,
      forgotFormData,
      formErrors,
      forgotPasswordChange,
      forgotPassowrd
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      forgotPassowrd();
    };

    return (
      <div className='forgot-password-form'>
        <h2>Forgot Password</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs='12' md='6'>
              <Input
                type={'text'}
                error={formErrors['email']}
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
          <div className='auth-actions'>
            <Button type='submit' text='Send Email' />
            <Link className='redirect-link' to={'/login'}>
              Back to login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(ForgotPassword);
