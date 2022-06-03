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
        placeholder='Type the complete order ID'
        btnText='Search'
        onSearch={props.onSearch}
        onBlur={props.onBlur}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default OrderSearch;
