/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import Switch from '../../Common/Switch';

const BrandList = props => {
  const { brands, brandChange, activateBrand } = props;

  return (
    <div className='b-list'>
      {brands.map((brand, index) => (
        <div key={index} className='mb-3 p-4 brand-box'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h4 className='mb-0'>{brand.name}</h4>
            <Switch
              id={`enable-brand-${brand._id}`}
              name={'isActive'}
              checked={brand.isActive}
              toggleCheckboxChange={value => activateBrand(brand._id, value)}
            />
          </div>
          <Link to={`/dashboard/brand/edit/${brand._id}`} className='d-block'>
            <p className='brand-desc mb-2'>{brand.description}</p>
            {brand?.merchant && (
              <div className='d-flex'>
                <label>Merchant</label>
                <p className='brand-merchant mb-0 ml-2 text-primary'>
                  {brand.merchant.name}
                </p>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrandList;
