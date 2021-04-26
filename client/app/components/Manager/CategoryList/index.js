/**
 *
 * CategoryList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const CategoryList = props => {
  const { categories } = props;

  return (
    <div className='c-list'>
      {categories.map((category, index) => (
        <Link
          to={`/dashboard/category/edit/${category._id}`}
          key={index}
          className='d-block mb-3 p-4 category-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{category.name}</h4>
          </div>
          <p className='mb-2 category-desc'>{category.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
