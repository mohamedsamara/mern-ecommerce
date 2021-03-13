/**
 *
 * Edit Address
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const EditAddress = props => {
  const { address, addressChange,isDefault,defaultChange, formErrors, updateAddress, deleteAddress } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateAddress();
  };

  return (
    <div className='edit-address'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['fullName']}
              label={'Full Name'}
              name={'fullName'}
              placeholder={'Please Enter Your Full Name'}
              value={address.fullName}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['phoneNumber']}
              label={'Mobile Number'}
              name={'phoneNumber'}
              placeholder={'Please Enter Your Mobile Number'}
              value={address.phoneNumber}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['email']}
              label={'Email'}
              name={'email'}
              placeholder={'Please Enter Your Email'}
              value={address.email}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['cityName']}
              label={'City/Town'}
              name={'cityName'}
              placeholder={'Please Enter Your City/Town'}
              value={address.cityName}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['stateName']}
              label={'State/province/district'}
              name={'stateName'}
              placeholder={'Please Enter Your State/province/district'}
              value={address.stateName}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['address']}
              label={'Address example (preferred): Flat / House No., Floor, Building, Street'}
              name={'address'}
              placeholder={'Address example (preferred): Flat / House No., Floor, Building, Street'}
              value={address.address}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['pinCode']}
              label={'Pincode'}
              name={'pinCode'}
              placeholder={'Please Enter Your Pincode'}
              value={address.pinCode}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['landMark']}
              label={'Landmark'}
              name={'landMark'}
              placeholder={'Please Enter Your Landmark'}
              value={address.landMark}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
          <Checkbox
            id={'default'}
            label={'As the Default'}
            checked={isDefault}
            toggleCheckboxChange={defaultChange}
          />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteAddress(address._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
