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
      <Row className='flex-row'>
        {products.map((product, index) => (
          <Col
            xs='12'
            md='6'
            lg='4'
            key={index}
            className='mb-3 mb-md-3 px-3 px-md-2'
          >
            <div className='product-container'>
              <div className='item-box'>
                <div className='item-body'>
                  <Link to={`/product/${product.slug}`} className='item-link'>
                    <img
                      src={`${
                        product.imageUrl
                          ? product.imageUrl
                          : '/images/placeholder-image.png'
                      }`}
                    />
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{product.name}</h1>
                      {product.brand && (
                        <p className='by'>
                          By <span>{product.brand.name}</span>
                        </p>
                      )}
                      <p className='item-desc mb-0'>{product.description}</p>
                    </div>
                  </Link>
                </div>
                <div className='item-footer px-3'>
                  <p className='price'>${product.price}</p>
                  {/* {product.quantity > 0 ? (
                      <p className='stock in-stock'>In stock</p>
                    ) : (
                      <p className='stock out-of-stock'>Out of stock</p>
                    )} */}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
