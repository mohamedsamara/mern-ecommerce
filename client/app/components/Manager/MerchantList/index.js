/**
 *
 * MerchantList
 *
 */

import React from 'react';

import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const MerchantList = props => {
  const { merchants, approveMerchant, rejectMerchant, deleteMerchant } = props;

  return (
    <div className='merchant-list'>
      {merchants.map((merchant, index) => (
        <div key={index} className='merchant-box'>
          <div className='mb-3 p-4'>
            <label className='text-black'>Business</label>
            <p className='fw-2 text-truncate'>{merchant.business}</p>
            <label className='text-black'>Brand</label>
            <p className='text-truncate'>{merchant.brand}</p>
            <label className='text-black'>Name</label>
            <p className='text-truncate'>{merchant.name}</p>
            <label className='text-black'>Email</label>
            <p className='text-truncate'>
              {merchant.email ? merchant.email : 'N/A'}
            </p>
            <label className='text-black'>Phone Number</label>
            <p>{merchant.phoneNumber}</p>
            <label className='text-black'>Request date</label>
            <p>{formatDate(merchant.created)}</p>

            <hr />

            {merchant.status === 'Approved' ? (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-row mx-0'>
                  <CheckIcon className='text-green' />
                  <p className='ml-2 mb-0'>Approved</p>
                </div>

                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </div>
            ) : merchant.status === 'Rejected' ? (
              <>
                <div className='d-flex align-items-center mb-3'>
                  <RefreshIcon className='text-primary' />
                  <p className='fw-2 ml-3 mb-0'>Re Approve Merchant</p>
                </div>
                <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                  <Button
                    className='text-uppercase'
                    variant='primary'
                    size='md'
                    text='Approve'
                    onClick={() => approveMerchant(merchant)}
                  />
                  <Button
                    className='mt-3 mt-lg-0'
                    text='Delete'
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteMerchant(merchant._id)}
                  />
                </div>
              </>
            ) : merchant.email ? (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-column flex-lg-row mx-0'>
                  <Button
                    variant='dark'
                    className='text-uppercase'
                    size='md'
                    text='Approve'
                    onClick={() => approveMerchant(merchant)}
                  />
                  <Button
                    variant='danger'
                    className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                    size='md'
                    text='Reject'
                    onClick={() => rejectMerchant(merchant)}
                  />
                </div>
                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </div>
            ) : (
              <>
                <p className='text-truncate'>
                  Merchant doesn't have email. Call at
                  <a
                    href={`tel:${merchant.phoneNumber}`}
                    className='text-primary'
                  >
                    {' '}
                    {merchant.phoneNumber}
                  </a>
                </p>
                <Button
                  className='w-100 w-lg-auto'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MerchantList;
