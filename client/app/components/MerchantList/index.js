/**
 *
 * MerchantList
 *
 */

import React from 'react';

import { formatDate } from '../../helpers/date';
import Button from '../Button';
import { CheckIcon, RefreshIcon } from '../Icon';

const MerchantList = props => {
  const { merchants, approveMerchant, rejectMerchant } = props;

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

            {merchant.status === 'Approved' ? (
              <>
                <CheckIcon className='text-green' />
                <p className='d-inline-block ml-2'>Approved</p>
              </>
            ) : merchant.status === 'Rejected' ? (
              <>
                <div className='d-flex align-items-center mb-3'>
                  <RefreshIcon className='text-primary' />
                  <p className='fw-2 d-inline-block ml-3 mb-0'>
                    Re Approve Merchant
                  </p>
                </div>

                <Button
                  className='text-uppercase'
                  variant='primary'
                  size='md'
                  text='Approve'
                  onClick={() => approveMerchant(merchant)}
                />
              </>
            ) : merchant.email ? (
              <div className='d-flex flex-column flex-sm-row'>
                <Button
                  className='text-uppercase'
                  variant='dark'
                  size='md'
                  text='Approve'
                  onClick={() => approveMerchant(merchant)}
                />
                <Button
                  className='mt-3 mt-sm-0 ml-sm-2 text-uppercase'
                  variant='danger'
                  size='md'
                  text='Reject'
                  onClick={() => rejectMerchant(merchant)}
                />
              </div>
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
