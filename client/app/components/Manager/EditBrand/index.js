/**
 *
 * EditBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const EditBrand = props => {
  const { brand, brandChange, formErrors, updateBrand, deleteBrand } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateBrand();
  };

  return (
    <div className='add-brand'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Brand Name'}
              value={brand.name}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Brand Description'}
              value={brand.description}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
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
            onClick={() => deleteBrand(brand._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
