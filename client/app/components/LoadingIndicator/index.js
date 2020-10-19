/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';

const LoadingIndicator = props => {
  const { inline, backdrop } = props;

  return (
    <div
      className={`spinner-container${
        inline ? ' position-relative' : ' position-fixed overlay'
      } ${backdrop ? 'backdrop' : ''}`}
    >
      <div
        className={`spinner${
          inline ? ' position-relative' : ' position-fixed overlay'
        }`}
      ></div>
    </div>
  );
};

LoadingIndicator.defaultProps = {
  inline: false,
  backdrop: false
};

export default LoadingIndicator;
