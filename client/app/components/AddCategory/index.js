/**
 *
 * AddCategory
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';

const AddCategory = props => {
  const { categoryFormData, categoryChange, addCategory } = props;

  return (
    <div className='add-category'>
      <Row>
        <Col xs='12' md='6'>
          <Input
            type={'text'}
            label={'Name'}
            name={'name'}
            placeholder={'Category Name'}
            value={categoryFormData.name}
            onInputChange={(name, value) => {
              categoryChange(name, value);
            }}
          />
        </Col>
        <Col xs='12' md='12'>
          <Input
            type={'textarea'}
            label={'Description'}
            name={'description'}
            placeholder={'Category Description'}
            value={categoryFormData.description}
            onInputChange={(name, value) => {
              categoryChange(name, value);
            }}
          />
        </Col>
      </Row>
      <hr />
      <div className='add-category-actions'>
        <button
          className='input-btn'
          type='submit'
          onClick={() => addCategory()}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
