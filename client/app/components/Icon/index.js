/**
 *
 * Icon
 *
 */

import React from 'react';

const BagIcon = () => {
  return (
    <svg
      aria-hidden='true'
      className='bag-icon'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      enableBackground='new 0 0 512 512'
    >
      <g>
        <path d='m417.9,104.4h-65.5c-2.2-51-44.8-92.4-96.4-92.4s-94.2,41.3-96.5,92.4h-66.5l-30.1,395.6h386.2l-31.2-395.6zm-161.9-71.6c40.1,0 73.5,32 75.7,71.6h-151.4c2.2-39.6 35.6-71.6 75.7-71.6zm-143.3,92.4h46.7v68.5h20.8v-68.5h151.6v68.5h20.8v-68.5h47.8l27,354h-341.7l27-354z' />
      </g>
    </svg>
  );
};

const BarsIcon = () => {
  return <span className='bars-icon fa fa-bars' aria-hidden='true' />;
};

const CloseIcon = () => {
  return <span className='close-icon' aria-hidden='true' />;
};

export { BagIcon, BarsIcon, CloseIcon };
