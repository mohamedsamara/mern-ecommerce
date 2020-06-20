/**
 *
 * MiniBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const MiniBrand = props => {
  const { brands } = props;
  return (
    <div className='mini-brand-list'>
      <h2>Shop By Brand</h2>
      <div className='mini-brand-block'>
        {brands.map((brand, index) => (
          <div key={index} className='brand-item'>
            <Link to={`/shop/brand/${brand.slug}`} className='brand-link'>
              {brand.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBrand;
