/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import SelectOption from '../SelectOption';

const AddProduct = props => {
  const {
    productFormData,
    productChange,
    addProduct,
    selectedCategories,
    categories,
    categorySelect,
    brandSelect,
    selectedBrands,
    brands
  } = props;

  return (
    <div className='add-product'>
      <h1 />
      <Row>
        <Col xs='12' md='6'>
          <Input
            type={'text'}
            label={'Sku'}
            name={'sku'}
            placeholder={'Product Sku'}
            value={productFormData.sku}
            onInputChange={(name, value) => {
              productChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='6'>
          <Input
            type={'text'}
            label={'Name'}
            name={'name'}
            placeholder={'Product Name'}
            value={productFormData.name}
            onInputChange={(name, value) => {
              productChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            placeholder={'Product Description'}
            value={productFormData.description}
            onInputChange={(name, value) => {
              productChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='6'>
          <Input
            type={'number'}
            label={'Quantity'}
            name={'quantity'}
            placeholder={'Product Quantity'}
            value={productFormData.quantity}
            onInputChange={(name, value) => {
              productChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='6'>
          <Input
            type={'number'}
            label={'Price'}
            name={'price'}
            placeholder={'Product Price'}
            value={productFormData.price}
            onInputChange={(name, value) => {
              productChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <SelectOption
            label={'Select Categories'}
            multi={true}
            options={categories}
            value={selectedCategories}
            handleSelectChange={value => {
              categorySelect(value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <SelectOption
            label={'Select Brand'}
            multi={false}
            options={brands}
            value={selectedBrands}
            handleSelectChange={value => {
              brandSelect(value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='add-product-actions'>
        <button
          className='input-btn'
          type='submit'
          onClick={() => addProduct()}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
