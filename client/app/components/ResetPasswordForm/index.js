/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';

const ResetPasswordForm = props => {
  const { resetFormData, resetPasswordChange, resetPassowrd } = props;

  return (
    <div className='reset-password-form'>
      <Row>
        <Col xs='12' md='6'>
          <Input
            type={'password'}
            label={'Password'}
            name={'password'}
            placeholder={'Password'}
            value={resetFormData.password}
            onInputChange={(name, value) => {
              resetPasswordChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='6'>
          <Input
            type={'password'}
            label={'Confirm Password'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            value={resetFormData.confirmPassword}
            onInputChange={(name, value) => {
              resetPasswordChange(name, value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='reset-actions'>
        <button
          className='input-btn'
          type='submit'
          onClick={() => resetPassowrd()}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
