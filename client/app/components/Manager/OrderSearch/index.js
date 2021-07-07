/**
 *
 * OrderSearch
 *
 */

import React from 'react';

import SearchBar from '../../Common/SearchBar';

const OrderSearch = props => {
  return (
    <div className='mb-3'>
      <SearchBar
        name='order'
        placeholder='Type order ID'
        btnText='Search Orders'
        onSearchSubmit={props.onSearchSubmit}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default OrderSearch;
