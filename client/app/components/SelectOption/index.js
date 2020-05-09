/**
 *
 * Select
 *
 */

import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectOption = props => {
  const { label, multi, options, value, handleSelectChange } = props;

  const _handleSelectChange = value => {
    handleSelectChange(value);
  };

  const animatedComponents = makeAnimated();

  return (
    <div className='select-box'>
      {label && <label>{label}</label>}
      <Select
        className='select-container'
        classNamePrefix='select-option'
        components={animatedComponents}
        isMulti={multi}
        options={options}
        value={value}
        onChange={_handleSelectChange}
      />
    </div>
  );
};

export default SelectOption;
