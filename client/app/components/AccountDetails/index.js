/**
 *
 * AccountDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';

const AccountDetails = props => {
  const { profile, accountChange, updateProfile } = props;

  return (
    <div className='account-details'>
      <Row>
        <Col xs='12' md='12'>
          <Input
            type={'text'}
            label={'First Name'}
            name={'firstName'}
            value={profile.firstName}
            onInputChange={(name, value) => {
              accountChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <Input
            type={'text'}
            label={'Last Name'}
            name={'lastName'}
            value={profile.lastName}
            onInputChange={(name, value) => {
              accountChange(name, value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='profile-actions'>
        <button
          className='input-btn'
          type='submit'
          onClick={() => updateProfile()}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
