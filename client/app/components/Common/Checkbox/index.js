/**
 *
 * Checkbox
 *
 */

import React from 'react';

const Checkbox = props => {
  const { id, label, name, checked, value, toggleCheckboxChange } = props;

  const _onChange = e => {
    const value = e.target.checked;
    const name = e.target.name;
    toggleCheckboxChange(name, value);
  };

  return (
    <div className='checkbox'>
      <input
        className={'input-checkbox'}
        type={'checkbox'}
        id={id}
        name={name}
        value={value}
        onChange={e => {
          _onChange(e);
        }}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
