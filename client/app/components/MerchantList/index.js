/**
 *
 * MerchantList
 *
 */

import React from 'react';

import { formatDate } from '../../helpers/date';
import Button from '../Button';
import { CheckIcon } from '../Icon';

const MerchantList = props => {
  const { merchants } = props;

  console.log({ merchants });

  return (
    <div className='merchant-list'>
      {merchants.map((merchant, index) => (
        <div key={index} className='merchant-box'>
          <div className='mb-3 p-4'>
            <label className='text-black'>Business</label>
            <p className='fw-2 two-line-ellipsis'>{merchant.business}</p>
            <label className='text-black'>Brand</label>
            <p className='two-line-ellipsis'>{merchant.brand}</p>
            <label className='text-black'>Name</label>
            <p className='two-line-ellipsis'>{merchant.name}</p>
            <label className='text-black'>Email</label>
            <p className='two-line-ellipsis'>
              {merchant.email ? merchant.email : 'N/A'}
            </p>
            <label className='text-black'>Phone Number</label>
            <p>{merchant.phoneNumber}</p>
            <label className='text-black'>Request date</label>
            <p>{formatDate(merchant.created)}</p>

            <hr />
            {merchant.isApproved ? (
              <>
                <CheckIcon className='text-green' />
                <p className='d-inline-block ml-2'>Approved</p>
              </>
            ) : merchant.email ? (
              <Button
                variant='secondary'
                size='md'
                text='Approve'
                //   onClick={() => cancelOrderItem(item._id, order.products)}
              />
            ) : (
              <p>
                Merchant doesn't have email. Call at
                <a
                  href={`tel:${merchant.phoneNumber}`}
                  className='text-primary'
                >
                  {' '}
                  {merchant.phoneNumber}
                </a>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MerchantList;

// brand: "adidis"
// business: "selling shoes"
// created: "2020-10-29T12:32:37.731Z"
// isApproved: false
// name: "meo meo"
// phoneNumber: "1234567890"
// status: "Waiting Approval"
