/**
 *
 * WishList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import NotFound from '../../Common/NotFound';
import { TrashIcon } from '../../Common/Icon';

const WishList = props => {
  const { products,wishlistChange } = props;

  const getProduct = product => {
    if (product.isLiked !== undefined && product.isLiked == true) {
      return (
          <img
            className='wishlist-image'
            src={`${
              product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
      );
    }
  };

  return (
    <div className='w-list'>
      {products.map((product, index) => (
          <div key={index} className='d-flex flex-column flex-lg-row align-items-lg-center mb-3 wishlist-box' style={{marginBottom: '1rem !important'}}>
            {getProduct(product)}
            <div className='flex-1 p-3'>
                <Link
                    to={`/product/${product.slug}`}
                    className='d-block'
                  >
                  <h4 className='mb-0 mr-2 one-line-ellipsis text-primary' style={{cursor: 'pointer'}}>
                    {product.name}
                  </h4>
                </Link>
                <p className='mb-2 wishlist-desc'>
                  {`$${product?.price}`}
                </p>
                <div className='d-flex align-items-center justify-content-between mb-2'>
                  <label className='text-black'>{`Wishlist Added on ${formatDate(
                    product.wishlistAddedDate
                  )}`}</label>
                  <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                    <Button
                      className='mt-3 mt-lg-0'
                      text='Delete'
                      icon={<TrashIcon width={15} />}
                      onClick={(e) => {
                        e.target.name = product._id
                        e.target.checked = !product.isLiked
                        wishlistChange(e)
                      }}
                    />
                  </div>
                </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WishList;
