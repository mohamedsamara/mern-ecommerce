/**
 *
 * AddMerchant
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const AddMerchant = props => {
  const {
    merchantFormData,
    formErrors,
    isSubmitting,
    submitTitle = 'Submit',
    merchantChange,
    addMerchant
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addMerchant();
  };

  return (
    <div className='add-merchant'>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'You Full Name'}
              value={merchantFormData.name}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['email']}
              label={'Email Address'}
              name={'email'}
              placeholder={'Your Email Address'}
              value={merchantFormData.email}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['phoneNumber']}
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'Your Phone Number'}
              value={merchantFormData.phoneNumber}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['brand']}
              label={'Brand'}
              name={'brand'}
              placeholder={'Your Business Brand'}
              value={merchantFormData.brand}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'textarea'}
              error={formErrors['business']}
              label={'Business'}
              name={'business'}
              placeholder={'Please Describe Your Business'}
              value={merchantFormData.business}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-merchant-actions'>
          <Button type='submit' text={submitTitle} disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default AddMerchant;
