/**
 *
 * Input
 *
 */

import React from 'react';

const Input = props => {
  const { type, value, placeholder, label, name, onInputChange, dom } = props;

  function onChange(e) {
    onInputChange(e.target.name, e.target.value);
  }

  return (
    <div className='input-box'>
      {label && <label>{label}</label>}
      <input
        autoComplete='off'
        type={type}
        onChange={e => {
          onChange(e);
        }}
        name={name}
        value={value}
        placeholder={placeholder}
        className={'input-text'}
      />
      {dom}
    </div>
  );
};

export default Input;
