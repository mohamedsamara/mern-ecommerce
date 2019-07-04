/**
 *
 * select.js
 * this helper formulate data to select component
 */

export const formSelect = data => {
  let newCategories = [];

  data.map(category => {
    let newCategory = {};

    newCategory.value = category._id;
    newCategory.label = category.name;

    newCategories.push(newCategory);
  });

  return newCategories;
};

export const unformSelect = data => {
  let newCategories = [];

  data.map(category => {
    let newCategory = {};

    newCategory._id = category.value;

    newCategories.push(newCategory._id);
  });

  return newCategories;
};
