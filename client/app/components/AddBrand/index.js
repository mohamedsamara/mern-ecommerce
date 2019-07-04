/**
 *
 * AddBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import SelectOption from '../SelectOption';

const AddBrand = props => {
  const {
    brandFormData,
    brandChange,
    addBrand,
    products,
    selectedProducts,
    productSelect
  } = props;

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
        <Col xs='12' md='12'>
          <SelectOption
            label={'Select Products'}
            multi={true}
            options={products}
            value={selectedProducts}
            handleSelectChange={value => {
              productSelect(value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='add-brand-actions'>
        <button className='input-btn' type='submit' onClick={() => addBrand()}>
          Add Brand
        </button>
      </div>
    </div>
  );
};

export default AddBrand;
