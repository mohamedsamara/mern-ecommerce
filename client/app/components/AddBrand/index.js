/**
 *
 * AddBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import Button from '../../components/Button';

const AddBrand = props => {
  const { brandFormData, brandChange, addBrand } = props;

  return (
    <div className='add-brand'>
      <Row>
        <Col xs='12' md='6'>
          <Input
            type={'text'}
            label={'Name'}
            name={'name'}
            placeholder={'Brand Name'}
            value={brandFormData.name}
            onInputChange={(name, value) => {
              brandChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            placeholder={'Brand Description'}
            value={brandFormData.description}
            onInputChange={(name, value) => {
              brandChange(name, value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='add-brand-actions'>
        <Button text='Add Brand' onClick={() => addBrand()} />
      </div>
    </div>
  );
};

export default AddBrand;
