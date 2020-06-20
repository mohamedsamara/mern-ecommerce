/*
 *
 * Signup
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import actions from '../../actions';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingIndicator from '../../components/LoadingIndicator';
import SignupProvider from '../../components/SignupProvider';
import Checkbox from '../../components/Checkbox';

class Signup extends React.PureComponent {
  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      isSubscribed,
      signupChange,
      signUp,
      subscribeChange
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      signUp();
    };

    return (
      <div className='signup-form'>
        {isLoading && <LoadingIndicator />}
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className='col-no-padding'
            >
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['firstName']}
                  label={'First Name'}
                  name={'firstName'}
                  placeholder={'Please Enter Your First Name'}
                  value={signupFormData.firstName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['lastName']}
                  label={'Last Name'}
                  name={'lastName'}
                  placeholder={'Please Enter Your Last Name'}
                  value={signupFormData.lastName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'password'}
                  label={'Password'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
            </Col>
            <Col xs={{ size: 12, order: 1 }} md={{ size: '6', order: 2 }}>
              <SignupProvider />
            </Col>
          </Row>
          <hr />
          <Checkbox
            id={'subscribe'}
            label={'Subscribe to newsletter'}
            checked={isSubscribed}
            toggleCheckboxChange={subscribeChange}
          />
          <div className='auth-actions'>
            <Button type='submit' text='Sign Up' disabled={isSubmitting} />
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
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed
  };
};

export default connect(mapStateToProps, actions)(Signup);
