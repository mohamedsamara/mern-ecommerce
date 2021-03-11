/**
 *
 * NotFound
 *
 */

import React from 'react';

const NotFound = props => {
  const { message } = props;
  return <div className='not-found'>{message}</div>;
};

export default NotFound;
