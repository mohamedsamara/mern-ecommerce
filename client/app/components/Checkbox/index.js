/**
 *
 * Checkbox
 *
 */

import React from 'react';

const Checkbox = props => {
  const { id, label, checked, toggleCheckboxChange } = props;

  return (
    <div className='checkbox'>
      <input
        type={'checkbox'}
        id={id}
        value={label}
        onChange={toggleCheckboxChange}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
