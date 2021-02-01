/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const BrandList = props => {
  const { brands } = props;

  return (
    <div className='b-list'>
      {brands.map((brand, index) => (
        <Link
          to={`/dashboard/brand/edit/${brand._id}`}
          key={index}
          className='d-block'
        >
          <div className='mb-3 p-4 brand-box'>
            <h4>{brand.name}</h4>
            <p className='brand-desc mb-2'>{brand.description}</p>
            {brand?.merchant && (
              <>
                <label>Merchant</label>
                <p className='brand-merchant mb-0 text-primary'>
                  {brand.merchant.name}
                </p>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrandList;
