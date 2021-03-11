/**
 *
 * ComingSoon
 *
 */

import React from 'react';

const ComingSoon = props => {
  return (
    <div className='coming-soon'>
      <h3>Coming soon</h3>
      {props.children}
    </div>
  );
};

export default ComingSoon;
