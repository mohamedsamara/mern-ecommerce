/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const ProductList = props => {
  const { products } = props;

  return (
    <div className='p-list'>
      {products.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className='d-block'
        >
          <div className='d-flex flex-column flex-lg-row align-items-lg-center mb-3 product-box'>
            <img
              className='item-image'
              src={`${
                product && product.imageUrl
                  ? product.imageUrl
                  : '/images/placeholder-image.png'
              }`}
            />
            <div className='p-4 p-lg-3'>
              <h4>{product.name}</h4>
              <p className='product-desc mb-2'>{product.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
