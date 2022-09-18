/**
 *
 * SearchResultMeta
 *
 */

import React from 'react';

const SearchResultMeta = props => {
  const { count, label } = props;

  return (
    <p className='fw-normal'>
      {count} {label}
    </p>
  );
};

export default SearchResultMeta;
