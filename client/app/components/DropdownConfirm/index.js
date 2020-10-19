/**
 *
 * DropdownConfirm
 *
 */

import React from 'react';

import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

const DropdownConfirm = props => {
  const { label, children } = props;

  return (
    <div className='dropdown-confirm'>
      <UncontrolledButtonDropdown>
        <DropdownToggle nav>
          <div className='input-btn custom-btn-secondary md text-only'>
            {label}
            <span className='fa fa-chevron-down dropdown-caret'></span>
          </div>
        </DropdownToggle>

        <DropdownMenu right>{children}</DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

DropdownConfirm.DropdownConfirm = {
  label: ''
};

export default DropdownConfirm;
