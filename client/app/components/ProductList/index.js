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
      <Row>
        {products.map((product, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3'>
            <div className='product-container'>
              <div className='product-box'>
                <Link to={`/product/${product.slug}`}>
                  <h1>{product.name}</h1>
                  {product.brand.name && (
                    <p className='by'>
                      <span>By</span>
                      {product.brand.name}
                    </p>
                  )}
                  <p className='product-desc'>{product.description}</p>
                  <p className='price'>${product.price}</p>
                  {product.quantity > 0 ? (
                    <p className='stock in-stock'>In stock</p>
                  ) : (
                    <p className='stock out-of-stock'>Out of stock</p>
                  )}
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
