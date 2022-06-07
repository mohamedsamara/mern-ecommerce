/**
 *
 * AddToWishList
 *
 */

import React from 'react';

import Checkbox from '../../Common/Checkbox';
import { HeartIcon } from '../../Common/Icon';

const AddToWishList = props => {
  const { id, liked, enabled, updateWishlist } = props;

  return (
    <div className='add-to-wishlist'>
      <Checkbox
        id={`checkbox_${id}`}
        name={'wishlist'}
        disabled={!enabled}
        checked={liked}
        label={<HeartIcon />}
        onChange={(_, value) => {
          updateWishlist(value, id);
        }}
      />
    </div>
  );
};

export default AddToWishList;
