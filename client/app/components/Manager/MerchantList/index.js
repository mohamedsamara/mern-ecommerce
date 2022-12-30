/**
 *
 * MerchantList
 *
 */

import React from 'react';

import { MERCHANT_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { CheckIcon, XIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const MerchantList = props => {
  const {
    merchants,
    approveMerchant,
    rejectMerchant,
    deleteMerchant,
    disableMerchant
  } = props;

  const renderMerchantPopover = merchant => (
    <div className='p-2'>
      <p className='text-gray text-14'>
        {merchant.isActive
          ? "Disabling merchant account will disable merchant's brand and account access."
          : 'Enabling merchant account will restore merchant account access.'}
      </p>
      <Button
        variant='dark'
        size='sm'
        className='w-100'
        text={merchant.isActive ? 'Disable Merchant' : 'Enable Merchant'}
        onClick={() => disableMerchant(merchant, !merchant.isActive)}
      />
    </div>
  );

  return (
    <div className='merchant-list'>
      {merchants.map((merchant, index) => (
        <div key={index} className='merchant-box'>
          <div className='mb-3 p-4'>
            <label className='text-black'>Business</label>
            <p className='fw-medium text-truncate'>{merchant.business}</p>
            <label className='text-black'>Brand</label>
            <p className='text-truncate'>{merchant.brandName}</p>
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

            {merchant.status === MERCHANT_STATUS.Approved ? (
              <>
                <div className='d-flex flex-row justify-content-between align-items-center mx-0'>
                  <div className='d-flex flex-row mx-0'>
                    <CheckIcon className='text-green' />
                    <p className='ml-2 mb-0'>Approved</p>
                  </div>

                  <div className='d-flex flex-row align-items-center mx-0'>
                    <Button
                      className='ml-3'
                      size='lg'
                      round={20}
                      icon={<TrashIcon width={20} />}
                      tooltip={true}
                      tooltipContent='Delete'
                      id={`delete-${merchant._id}`}
                      onClick={() => deleteMerchant(merchant)}
                    />
                  </div>
                </div>
                <Button
                  className='w-100 mt-3'
                  size='sm'
                  text={
                    merchant.isActive ? 'Disable Merchant' : 'Enable Merchant'
                  }
                  popover={true}
                  popoverTitle={`Are you sure you want to ${
                    merchant.isActive ? 'disable' : 'enable'
                  } ${merchant.name}'s merchant account?`}
                  popoverContent={renderMerchantPopover(merchant)}
                />
              </>
            ) : merchant.status === MERCHANT_STATUS.Rejected ? (
              <>
                <div className='d-flex flex-row justify-content-between align-items-center mx-0'>
                  <Button
                    size='lg'
                    round={20}
                    icon={<RefreshIcon width={18} className='text-primary' />}
                    tooltip={true}
                    tooltipContent='Re-Approve'
                    id={`re-approve-${merchant._id}`}
                    onClick={() => approveMerchant(merchant)}
                  />
                  <div className='d-flex flex-row align-items-center mx-0'>
                    <Button
                      className='ml-3'
                      size='lg'
                      round={20}
                      icon={<TrashIcon width={20} />}
                      tooltip={true}
                      tooltipContent='Delete'
                      id={`delete-${merchant._id}`}
                      onClick={() => deleteMerchant(merchant)}
                    />
                  </div>
                </div>
              </>
            ) : merchant.email ? (
              <div className='d-flex flex-row justify-content-between align-items-center mx-0'>
                <div className='d-flex flex-row mx-0'>
                  <Button
                    size='lg'
                    round={20}
                    icon={<CheckIcon width={18} className='text-green' />}
                    tooltip={true}
                    tooltipContent='Approve'
                    id={`approve-${merchant._id}`}
                    onClick={() => approveMerchant(merchant)}
                  />
                  <Button
                    className='ml-2'
                    size='lg'
                    round={20}
                    icon={<XIcon width={20} />}
                    tooltip={true}
                    tooltipContent='Reject'
                    id={`reject-${merchant._id}`}
                    onClick={() => rejectMerchant(merchant)}
                  />
                </div>
                <div className='d-flex flex-row align-items-center mx-0'>
                  <Button
                    className='ml-3'
                    size='lg'
                    round={20}
                    icon={<TrashIcon width={20} />}
                    tooltip={true}
                    tooltipContent='Delete'
                    id={`delete-${merchant._id}`}
                    onClick={() => deleteMerchant(merchant)}
                  />
                </div>
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
                  size='lg'
                  round={20}
                  icon={<TrashIcon width={20} />}
                  tooltip={true}
                  tooltipContent='Delete'
                  id={`delete-${merchant._id}`}
                  onClick={() => deleteMerchant(merchant)}
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
