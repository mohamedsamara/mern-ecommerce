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
    <div className='product-list'>
      <div key={0} className='mb-3 mb-md-0'>
        <div className='product-container'>
          <div className='item-box'>
            <div className='item-link'>
              <Link
                to={`/shop`}
                className='d-flex flex-column h-100'
              >
                <div className='item-image-container'>
                  <div className='item-image-box'>
                    <img
                      className='item-image'
                      src={`${
                        '/images/placeholder-image.png'
                      }`}
                    />
                  </div>
                </div>
                <div className='item-body'>
                  <div className='item-details p-3'>
                    <h1 className='item-name'>All Products</h1>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {categories.map((category, index) => (
        <div key={index + 1} className='mb-3 mb-md-0'>
          <div className='product-container'>
            <div className='item-box'>
              <div className='item-link'>
                <Link
                  to={`/shop/category/${category.slug}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='item-image'
                        src={`${
                          category.imageUrl
                            ?? '/images/placeholder-image.png'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{category.name}</h1>
                      <p className='item-desc mb-0'>{category.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
