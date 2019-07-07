/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const BrandList = props => {
  const { brands } = props;

  return (
    <div className='brand-list'>
      <h2>Brands</h2>
      <hr />
      <Row>
        {brands.map((brand, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3'>
            <div className='brand-box'>
              <Link to={`shop/brand/${brand.slug}`}>
                <h1>{brand.name}</h1>
                <p className='brand-desc'>{brand.description}</p>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrandList;
