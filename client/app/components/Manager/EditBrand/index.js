/**
 *
 * EditBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';

const EditBrand = props => {
  const {
    brand,
    brandChange,
    formErrors,
    updateBrand,
    deleteBrand,
    activateBrand
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateBrand();
  };

  return (
    <div className='edit-brand'>
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
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={brand.isActive}
              tooltipContent={`Disabling ${brand.name} will also disable all ${brand.name} products.`}
              id={`enable-brand-${brand._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={brand.isActive}
              toggleCheckboxChange={value => activateBrand(brand._id, value)}
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
