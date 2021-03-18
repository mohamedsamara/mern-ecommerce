/**
 *
 * CategoryList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import Switch from '../../Common/Switch';

const CategoryList = props => {
  const { categories, activateCategory } = props;

  return (
    <div className='c-list'>
      {categories.map((category, index) => (
        <div key={index} className='mb-3 p-4 category-box'>
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{category.name}</h4>
            <Switch
              tooltip={category.isActive}
              tooltipContent={`Disabling ${category.name} will also disable all ${category.name} products.`}
              id={`enable-category-${category._id}`}
              name={'isActive'}
              checked={category.isActive}
              toggleCheckboxChange={value =>
                activateCategory(category._id, value)
              }
            />
          </div>
          <Link
            to={`/dashboard/category/edit/${category._id}`}
            className='d-block'
          >
            <p className='category-desc mb-2'>{category.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
