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
            <p className='address-desc mb-2'><b>{address.isDefault? 'Default Delivery Address : ': null}</b>{address.address},{address.state},{address.country},{address.zipCode}</p>
            <p className='address-desc mb-2'><b>Landmark : </b>{address.landMark}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AddressList;
