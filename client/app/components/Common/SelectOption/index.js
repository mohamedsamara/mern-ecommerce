/**
 *
 * SelectOption
 *
 */

import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectOption = props => {
  const {
    disabled,
    error,
    label,
    multi,
    options,
    defaultValue,
    value,
    handleSelectChange
  } = props;

  const _handleSelectChange = value => {
    handleSelectChange(value);
  };

  const animatedComponents = makeAnimated();

  const styles = `select-box${error ? ' invalid' : ''}`;

  return (
    <div className={styles}>
      {label && <label>{label}</label>}
      <Select
        isDisabled={disabled}
        className='select-container'
        classNamePrefix='select-option'
        components={animatedComponents}
        isMulti={multi}
        options={options}
        defaultValue={defaultValue}
        value={value}
        onChange={_handleSelectChange}
      />
      <span className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};

export default SelectOption;
