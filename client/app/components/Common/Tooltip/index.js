/**
 *
 * Tooltip
 *
 */

import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = props => {
  const { target, placement, children } = props;

  return (
    <UncontrolledTooltip placement={placement} target={target}>
      {children}
    </UncontrolledTooltip>
  );
};

Tooltip.defaultProps = {
  placement: 'top'
};

export default Tooltip;
