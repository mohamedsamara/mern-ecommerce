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
        classNamePrefix='react-select'
        components={animatedComponents}
        isMulti={multi}
        options={options}
        defaultValue={defaultValue}
        value={value}
        onChange={_handleSelectChange}
        styles={dropdownStyles}
      />
      <span className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};

export default SelectOption;

const dropdownStyles = {
  control: (styles, { isFocused, isDisabled }) => {
    return {
      ...styles,
      color: '#323232',
      fontFamily: 'Poppins',
      backgroundColor: 'white',
      transition: '0.3s',
      boxShadow: 'none',

      borderColor: isFocused ? '#bdcbd2' : '#e4e6eb',

      ':hover': {
        borderColor: !isFocused ? '#e4e6eb' : '#bdcbd2',
        boxShadow: 'none'
      }
    };
  },
  menu: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      zIndex: 2
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#323232',
      fontFamily: 'Poppins',
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#eceef3'
        : isFocused
        ? '#eceef3'
        : undefined,

      ':hover': {
        ...styles[':hover'],
        backgroundColor: !isDisabled ? '#eceef3' : undefined
      },

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? '#eceef3' : undefined
      }
    };
  },
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    transform: isFocused ? 'rotate(180deg)' : undefined,
    transition: 'transform 0.3s'
  }),
  input: styles => ({
    ...styles,
    color: '#323232'
  }),
  placeholder: styles => ({
    ...styles,
    color: '#323232'
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: '#323232',
    fontFamily: 'Poppins'
  })
};
