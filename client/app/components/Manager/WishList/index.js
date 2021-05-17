/**
 *
 * WishList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import { XIcon } from '../../Common/Icon';

const WishList = props => {
  const { wishlist, updateWishlist } = props;

  const getProductImage = item => {
    if (item.product) {
      const product = item.product;
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            src={`${
              product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className='w-list'>
      {wishlist.map((item, index) => (
        <div
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 wishlist-box'
        >
          <Link
            to={`/product/${item.product.slug}`}
            key={index}
            className='d-flex flex-1 align-items-center text-truncate'
          >
            {getProductImage(item)}
            <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
              <h4 className='text-truncate'>{item.product.name}</h4>
              <p className='mb-2 price'>${item.product.price}</p>
              <label className='text-truncate'>{`Wishlist Added on ${formatDate(
                item.created
              )}`}</label>
            </div>
          </Link>
          <div className='remove-wishlist-box'>
            <Button
              borderless
              variant='danger'
              icon={<XIcon className='text-white' width={15} />}
              onClick={e => {
                e.target.name = item.product._id;
                e.target.checked = !item.isLiked;
                updateWishlist(e);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
