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
          className='d-block'
        >
          <div className='mb-3 p-4 category-box'>
            <h4>{category.name}</h4>
            <p className='category-desc mb-2'>{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
