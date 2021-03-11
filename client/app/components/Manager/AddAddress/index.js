/**
 *
 * AddAddress
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddAddress = props => {
  const {
    addressFormData,
    formErrors,
    addressChange,
    addAddress,
    isDefault,
    defaultChange
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addAddress();
  };

  return (
    <div className='add-address'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['fullName']}
              label={'Full Name'}
              name={'fullName'}
              placeholder={'Please Enter Your Full Name'}
              value={addressFormData.fullName}
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
              value={addressFormData.phoneNumber}
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
              value={addressFormData.email}
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
              value={addressFormData.cityName}
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
              value={addressFormData.stateName}
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
              value={addressFormData.address}
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
              value={addressFormData.pinCode}
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
              value={addressFormData.landMark}
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
        <div className='add-address-actions'>
          <Button type='submit' text='Add Address' />
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
