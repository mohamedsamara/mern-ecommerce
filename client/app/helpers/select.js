/**
 *
 * select.js
 * this helper formulate data into select options
 */

export const formatSelectOptions = data => {
  let newSelectOptions = [];

  data.map(option => {
    let newOption = {};

    newOption.value = option._id;
    newOption.label = option.name;

    newSelectOptions.push(newOption);
  });

  return newSelectOptions;
};

export const unformatSelectOptions = data => {
  let newSelectOptions = [];

  data.map(option => {
    let newOption = {};

    newOption._id = option.value;

    newSelectOptions.push(newOption._id);
  });

  return newSelectOptions;
};
