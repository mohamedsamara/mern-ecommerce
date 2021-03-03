/**
 *
 * UserSearch
 *
 */

import React from 'react';

import SearchBar from '../../Common/SearchBar';

const UserSearch = props => {
  return (
    <div className='mb-3'>
      <SearchBar
        name='user'
        placeholder='Type user name or email'
        btnText='Search Users'
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default UserSearch;
