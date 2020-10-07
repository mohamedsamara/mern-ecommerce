/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';

const LoadingIndicator = props => {
  const { inline } = props;

  return (
    <div
      className={`spinner-container${
        inline ? ' position-relative' : ' position-fixed overlay'
      }`}
    >
      <div
        className={`spinner${
          inline ? ' position-relative' : ' position-fixed overlay'
        }`}
      ></div>
    </div>
  );
};

export default LoadingIndicator;
