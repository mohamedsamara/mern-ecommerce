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
  const {
    user,
    profileData,
    accountChange,
    updateProfile,
    unsubscribeFromNewsletter,
    subscribeToNewsletter
  } = props;

  return (
    <div className='account-details'>
      <div className='info'>
        <div className='desc'>
          <p>{user.email}</p>
          {user.role !== 'ROLE_MEMBER' && <span className='admin'>Admin</span>}
        </div>
        <div className='actions'>
          {user.profile &&
          user.profile.hasOwnProperty('subscriberId') &&
          user.profile.subscriberId.length > 0 ? (
            <Button
              text='Unsubscribe From Newsletter'
              className='btn-no-shape'
              onClick={() =>
                unsubscribeFromNewsletter(user.profile.subscriberId)
              }
            />
          ) : (
            <Button
              text='Subscribe To Newsletter'
              className='btn-no-shape'
              onClick={() => subscribeToNewsletter(user.email)}
            />
          )}
        </div>
      </div>
      <Row>
        <Col xs='12' md='12'>
          <Input
            type={'text'}
            label={'First Name'}
            name={'firstName'}
            placeholder={'Please Enter Your First Name'}
            value={profileData.firstName}
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
            placeholder={'Please Enter Your Last Name'}
            value={profileData.lastName}
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
