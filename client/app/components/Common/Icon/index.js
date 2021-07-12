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

const CheckIcon = ({ className = '' }) => {
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

const RefreshIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} refresh-icon`}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='23 4 23 10 17 10' />
      <polyline points='1 20 1 14 7 14' />
      <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' />
    </svg>
  );
};

const AddressIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} address-icon`}
      enableBackground='new 0 0 512 512'
      width={width}
      height={height}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          d='m470.793 489.077h-195.735v-109.064l97.868-88.713 97.867 88.713z'
          fill='#f8f7f7'
        />
        <path d='m439.887 351.998v137.079h30.906v-109.064z' fill='#efefef' />
        <path
          d='m411.042 489.203h-76.233v-73.01c0-21.051 17.065-38.117 38.117-38.117 21.051 0 38.117 17.065 38.117 38.117v73.01z'
          fill='#686169'
        />
        <path
          d='m233.9 117.204c0 104.853-105.051 201.285-116.95 201.285s-116.95-96.432-116.95-201.285c0-64.73 52.36-117.204 116.95-117.204s116.95 52.474 116.95 117.204z'
          fill='#ff6167'
        />
        <path
          d='m116.95 0c-5.239 0-10.396.351-15.453 1.02 57.285 7.579 101.497 56.704 101.497 116.184 0 84.985-69.009 164.433-101.497 191.491 7.595 6.325 13.198 9.794 15.453 9.794 11.899 0 116.95-96.432 116.95-201.285 0-64.73-52.36-117.204-116.95-117.204z'
          fill='#fe454a'
        />
        <circle cx='116.95' cy='117.204' fill='#f8f7f7' r='79.324' />
        <path
          d='m116.95 37.88c-5.287 0-10.452.531-15.453 1.522 36.366 7.211 63.871 39.35 63.871 77.802s-27.505 70.591-63.871 77.802c5.001.991 10.165 1.522 15.453 1.522 43.739 0 79.324-35.585 79.324-79.324s-35.584-79.324-79.324-79.324z'
          fill='#efefef'
        />
        <path
          d='m504.92 386.251-121.562-111.259c-5.903-5.405-14.962-5.405-20.865 0l-121.561 111.259c-6.296 5.762-6.728 15.536-.967 21.832 5.763 6.295 15.538 6.727 21.832.966l111.129-101.711 111.129 101.711c2.965 2.714 6.702 4.054 10.429 4.054 4.184 0 8.355-1.69 11.403-5.02 5.761-6.296 5.328-16.07-.967-21.832z'
          fill='#ff6167'
        />
        <g fill='#7b727b'>
          <path d='m209.033 445.186h-28.606c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h28.606c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z' />
          <path d='m154.118 445.186h-17.687c-6.606 0-11.981-5.375-11.981-11.982v-24.473c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v24.473c0 14.878 12.104 26.982 26.981 26.982h17.687c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z' />
          <path d='m116.95 389.816c4.143 0 7.5-3.358 7.5-7.5v-26.476c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v26.476c0 4.142 3.358 7.5 7.5 7.5z' />
        </g>
        <path
          d='m496.547 512h-247.243c-8.534 0-15.453-6.918-15.453-15.453 0-8.534 6.918-15.453 15.453-15.453h247.243c8.534 0 15.453 6.918 15.453 15.453 0 8.535-6.918 15.453-15.453 15.453z'
          fill='#e07f5d'
        />
        <path
          d='m496.547 481.095h-30.905c8.534 0 15.453 6.919 15.453 15.453s-6.919 15.453-15.453 15.453h30.905c8.534 0 15.453-6.919 15.453-15.453 0-8.535-6.919-15.453-15.453-15.453z'
          fill='#d06d4a'
        />
      </g>
    </svg>
  );
};

const ReviewIcon = ({ className = '', width = '60', height = '60' }) => {
  return (
    <svg
      className={`${className} review-icon`}
      enableBackground='new 0 0 512 512'
      width={width}
      height={height}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          d='m151.632 106h-45.632-44.604l-30.396 15v255l28.658 15h46.342 60l15-15v-255z'
          fill='#ffdf40'
        />
        <path d='m181 376v-255l-29.368-15h-45.632v285h60z' fill='#ffbe40' />
        <path
          d='m436 61h-90-90c-24.814 0-45 20.186-45 45v120c0 24.814 20.186 45 45 45h15v45c0 6.064 3.647 11.543 9.258 13.857 5.533 2.309 12.023 1.071 16.348-3.252l49.394-49.394 6.211-6.211h83.789c24.814 0 45-20.186 45-45v-120c0-24.814-20.186-45-45-45z'
          fill='#7ed96c'
        />
        <path
          d='m436 271c24.814 0 45-20.186 45-45v-120c0-24.814-20.186-45-45-45h-90v216.211l6.211-6.211z'
          fill='#48b348'
        />
        <path d='m106 106h-15v300h15 15v-300z' fill='#ffbe40' />
        <path d='m106 106h15v300h-15z' fill='#ff9f40' />
        <path
          d='m386.605 140.395c-5.859-5.859-15.352-5.859-21.211 0l-19.394 19.394-15 15-11.895-11.895c-5.859-5.859-15.352-5.859-21.211 0s-5.859 15.352 0 21.211l22.5 22.5c2.93 2.93 6.768 4.395 10.605 4.395s7.676-1.465 10.605-4.395l4.395-4.395 40.605-40.605c5.861-5.859 5.861-15.351.001-21.21z'
          fill='#f9f4f3'
        />
        <path
          d='m386.605 140.395c-5.859-5.859-15.352-5.859-21.211 0l-19.394 19.394v42.422l40.605-40.605c5.86-5.86 5.86-15.352 0-21.211z'
          fill='#f0e6e1'
        />
        <path
          d='m166 0h-60-60c-8.291 0-15 6.709-15 15v76l25.421 15h49.579 45.632l29.368-15v-76c0-8.291-6.709-15-15-15z'
          fill='#ff6673'
        />
        <path
          d='m181 91v-76c0-8.291-6.709-15-15-15h-60v106h45.632z'
          fill='#e62e2e'
        />
        <path
          d='m106 376h-75c0 2.329.542 4.629 1.582 6.709l60 121c2.549 5.083 7.734 8.291 13.418 8.291s10.869-3.208 13.418-8.291l60-121c1.04-2.08 1.582-4.38 1.582-6.709z'
          fill='#ffebdc'
        />
        <path
          d='m119.418 503.709 60-121c1.04-2.08 1.582-4.38 1.582-6.709h-75v136c5.684 0 10.869-3.208 13.418-8.291z'
          fill='#ffd2c8'
        />
        <path d='m106 91h-75v30h75 75v-30z' fill='#4d6699' />
        <path d='m106 91h75v30h-75z' fill='#404b80' />
      </g>
    </svg>
  );
};

const TrashIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} trash-icon`}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    </svg>
  );
};

const XIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} x-icon`}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  );
};

const HeartIcon = ({ className = '' }) => {
  return (
    <svg
      className={`${className}`}
      enableBackground='new 467 392 58 57'
      viewBox='467 392 58 57'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='Group'
        fill='none'
        fillRule='evenodd'
        transform='translate(467 392)'
      >
        <path
          d='M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z'
          id='heart'
          fill='#AAB8C2'
        />
        <circle
          id='main-circ'
          fill='#E2264D'
          opacity='0'
          cx='29.5'
          cy='29.5'
          r='1.5'
        />

        <g id='grp7' opacity='0' transform='translate(7 6)'>
          <circle id='oval1' fill='#FF6347' cx='2' cy='6' r='2' />
          <circle id='oval2' fill='#FF4500' cx='5' cy='2' r='2' />
        </g>

        <g id='grp6' opacity='0' transform='translate(0 28)'>
          <circle id='oval1' fill='#FF6347' cx='2' cy='7' r='2' />
          <circle id='oval2' fill='#FF4500' cx='3' cy='2' r='2' />
        </g>

        <g id='grp3' opacity='0' transform='translate(52 28)'>
          <circle id='oval2' fill='#FF6347' cx='2' cy='7' r='2' />
          <circle id='oval1' fill='#FF4500' cx='4' cy='2' r='2' />
        </g>

        <g id='grp2' opacity='0' transform='translate(44 6)'>
          <circle id='oval2' fill='#FF6347' cx='5' cy='6' r='2' />
          <circle id='oval1' fill='#FF4500' cx='2' cy='2' r='2' />
        </g>

        <g id='grp5' opacity='0' transform='translate(14 50)'>
          <circle id='oval1' fill='#FFA500' cx='6' cy='5' r='2' />
          <circle id='oval2' fill='#FF6347' cx='2' cy='2' r='2' />
        </g>

        <g id='grp4' opacity='0' transform='translate(35 50)'>
          <circle id='oval1' fill='#FFA500' cx='6' cy='5' r='2' />
          <circle id='oval2' fill='#FF6347' cx='2' cy='2' r='2' />
        </g>

        <g id='grp1' opacity='0' transform='translate(24)'>
          <circle id='oval1' fill='#FFA500' cx='2.5' cy='3' r='2' />
          <circle id='oval2' fill='#FF6347' cx='7.5' cy='2' r='2' />
        </g>
      </g>
    </svg>
  );
};

const ArrowBackIcon = ({ className = '', width = '20', height = '20' }) => {
  return (
    <svg
      className={`${className} arrow-left-icon`}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='19' y1='12' x2='5' y2='12' />
      <polyline points='12 19 5 12 12 5' />
    </svg>
  );
};

export {
  BagIcon,
  BarsIcon,
  CloseIcon,
  GoogleIcon,
  FacebookIcon,
  CheckIcon,
  RefreshIcon,
  AddressIcon,
  ReviewIcon,
  TrashIcon,
  HeartIcon,
  XIcon,
  ArrowBackIcon
};
