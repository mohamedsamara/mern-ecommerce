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
      <h2>Shop By Brand</h2>
      <hr />
      <Row className='flex-sm-row'>
        {brands.map((brand, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
            <Link
              to={`/shop/brand/${brand.slug}`}
              className='d-block brand-box'
            >
              <h4>{brand.name}</h4>
              <p className='brand-desc'>{brand.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrandList;
