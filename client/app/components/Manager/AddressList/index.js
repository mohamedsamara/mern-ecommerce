/**
 *
 * AddressList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const AddressList = props => {
  const { addresses } = props;

  return (
    <div className='a-list'>
      {addresses.map((address, index) => (
        <Link
          to={`/dashboard/address/edit/${address._id}`}
          key={index}
          className='a-block'
        >
          <div className='mb-3 p-4 address-box'>
            <h4>{address.fullName}</h4>
            <h4>{address.phoneNumber}</h4>
            <p className='address-desc mb-2'>{address.address},{address.landMark},{address.cityName},{address.stateName},{address.pinCode}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AddressList;
