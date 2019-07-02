/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';

const AddProduct = props => {
  const { productFormData, productChange, addProduct } = props;

  return (
    <div className='add-product'>
      <h1>Add Product</h1>
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
