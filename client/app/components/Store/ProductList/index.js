/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProductList = props => {
  const { products } = props;
  return (
    <div className='product-list'>
      {products.map((product, index) => (
        <div key={index} className='mb-3 mb-md-0'>
          <div className='product-container'>
            <div className='item-box'>
              <Link to={`/product/${product.slug}`} className='item-link'>
                <div className='item-image-container'>
                  <div className='item-image-box'>
                    <img
                      className='item-image'
                      src={`${
                        product.imageUrl
                          ? product.imageUrl
                          : '/images/placeholder-image.png'
                      }`}
                    />
                  </div>
                </div>
                <div className='item-body'>
                  <div className='item-details p-3'>
                    <h1 className='item-name'>{product.name}</h1>
                    {product.brand && (
                      <p className='by'>
                        By <span>{product.brand.name}</span>
                      </p>
                    )}
                    <p className='item-desc mb-0'>{product.description}</p>
                  </div>
                </div>
                <div className='item-footer px-3'>
                  <p className='price'>${product.price}</p>
                  {/* {product.quantity > 0 ? (
                      <p className='stock in-stock'>In stock</p>
                    ) : (
                      <p className='stock out-of-stock'>Out of stock</p>
                    )} */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
