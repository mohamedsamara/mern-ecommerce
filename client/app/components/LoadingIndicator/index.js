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
      className={`spinner ${inline ? 'position-relative' : 'position-fixed'}`}
    />
  );
};

export default LoadingIndicator;
