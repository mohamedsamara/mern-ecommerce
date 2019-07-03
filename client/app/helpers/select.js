/**
 *
 * select.js
 * this helper formulate categories to client and server
 */

export const formCategoriesClientSelect = data => {
  let newCategories = [];

  data.map(category => {
    let newCategory = {};

    newCategory.value = category._id;
    newCategory.label = category.name;

    newCategories.push(newCategory);
  });

  return newCategories;
};

export const formCategoriesServerSelect = data => {
  let newCategories = [];

  data.map(category => {
    let newCategory = {};

    newCategory._id = category.value;

    newCategories.push(newCategory._id);
  });

  return newCategories;
};
