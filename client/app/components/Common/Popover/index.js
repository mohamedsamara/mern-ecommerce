/**
 *
 * Popover
 *
 */

import React from 'react';

import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

const Popover = props => {
  const { target, placement, popoverTitle, children } = props;

  return (
    <UncontrolledPopover placement={placement} target={target} trigger='legacy'>
      {popoverTitle && <PopoverHeader>{popoverTitle}</PopoverHeader>}
      <PopoverBody>{children}</PopoverBody>
    </UncontrolledPopover>
  );
};

Popover.defaultProps = {
  placement: 'top'
};

export default Popover;
