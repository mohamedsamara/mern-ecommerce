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

const GoogleIcon = () => {
  return (
    <svg
      className='google-icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 533.5 544.3'
    >
      <path
        fill='#4285f4'
        d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
      />
      <path
        fill='#34a853'
        d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
      />
      <path
        fill='#fbbc04'
        d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
      />
      <path
        fill='#ea4335'
        d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
      />
    </svg>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      className='facebook-icon'
      fill='#3b5998'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path d='M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z' />
    </svg>
  );
};

const CheckIcon = ({ className }) => {
  return (
    <svg
      className={`${className} check-icon`}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
      <polyline points='22 4 12 14.01 9 11.01' />
    </svg>
  );
};

export { BagIcon, BarsIcon, CloseIcon, GoogleIcon, FacebookIcon, CheckIcon };
