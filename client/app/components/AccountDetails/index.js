/**
 *
 * AccountDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import Button from '../../components/Button';

const AccountDetails = props => {
  const { user, profile, accountChange, updateProfile } = props;

  return (
    <div className='account-details'>
      <div className='info'>
        <p>{user.email}</p>
        {user.role !== 'ROLE_MEMBER' && <span>Admin</span>}
        {profile.isSubscribed && <span>Subscribed</span>}
      </div>
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
        <Button text='Save changes' onClick={() => updateProfile()} />
      </div>
    </div>
  );
};

export default AccountDetails;
