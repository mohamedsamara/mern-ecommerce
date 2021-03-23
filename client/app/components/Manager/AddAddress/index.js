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
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['address']}
              label={'Address example (preferred): Flat / House No., Floor, Building, Street, City, etc'}
              name={'address'}
              placeholder={'Address example (preferred): Flat / House No., Floor, Building, Street, City, etc'}
              value={addressFormData.address}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['state']}
              label={'State/province/district'}
              name={'state'}
              placeholder={'Please Enter Your State/province/district'}
              value={addressFormData.state}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['country']}
              label={'Country'}
              name={'country'}
              placeholder={'Please Enter Your country'}
              value={addressFormData.city}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['zipCode']}
              label={'Zipcode'}
              name={'zipCode'}
              placeholder={'Please Enter Your Zipcode'}
              value={addressFormData.zipCode}
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
