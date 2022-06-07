/**
 *
 * EditCategory
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import Switch from '../../Common/Switch';

const EditCategory = props => {
  const {
    products,
    category,
    categoryChange,
    formErrors,
    updateCategory,
    deleteCategory,
    activateCategory
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateCategory();
  };

  return (
    <div className='edit-category'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Category link </label>
        <Link to={`/shop/category/${category.slug}`} className='default-link'>
          {category.slug}
        </Link>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Category Name'}
              value={category.name}
              onInputChange={(name, value) => {
                categoryChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Category Slug'}
              value={category.slug}
              onInputChange={(name, value) => {
                categoryChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Category Description'}
              value={category.description}
              onInputChange={(name, value) => {
                categoryChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['products']}
              label={'Select Products'}
              multi={true}
              defaultValue={category.products}
              options={products}
              handleSelectChange={value => {
                categoryChange('products', value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={category.isActive}
              tooltipContent={`Disabling ${category.name} will also disable all ${category.name} products.`}
              id={`enable-category-${category._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={category.isActive}
              toggleCheckboxChange={value =>
                activateCategory(category._id, value)
              }
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
            onClick={() => deleteCategory(category._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
