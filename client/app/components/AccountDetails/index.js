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
  const { user, accountChange, updateProfile } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateProfile();
  };

  return (
    <div className='account-details'>
      <div className='info'>
        <div className='desc'>
          <p>{user.email}</p>
          {user.role !== 'ROLE_MEMBER' && <span className='admin'>Admin</span>}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'First Name'}
              name={'firstName'}
              placeholder={'Please Enter Your First Name'}
              value={user.firstName ? user.firstName : ''}
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
              value={user.lastName ? user.lastName : ''}
              onInputChange={(name, value) => {
                accountChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='profile-actions'>
          <Button type='submit' text='Save changes' />
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
