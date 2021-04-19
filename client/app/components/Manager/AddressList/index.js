/**
 *
 * AddressList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { AddressIcon, CheckIcon } from '../../Common/Icon';

const AddressList = props => {
  const { addresses } = props;

  return (
    <div className='a-list'>
      {addresses.map((address, index) => (
        <Link
          to={`/dashboard/address/edit/${address._id}`}
          key={index}
          className='d-block'
        >
          <div className='d-flex align-items-center mb-3 address-box'>
            <div className='mx-3'>
              <AddressIcon />
            </div>
            <div className='flex-1 p-3 p-lg-4'>
              {address.isDefault ? (
                <div className='d-flex align-items-center justify-content-between mb-2'>
                  <h4 className='mb-0 mr-2 one-line-ellipsis'>
                    Default Delivery Address
                  </h4>
                  <CheckIcon className='text-green' />
                </div>
              ) : (
                <h4 className='mb-0'>Delivery Address</h4>
              )}
              <p className='mb-2 address-desc'>
                {`${address?.address} ${address?.city}, ${address?.country}, ${address?.zipCode}`}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AddressList;
