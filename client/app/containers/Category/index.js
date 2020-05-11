/*
 *
 * Category
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AddCategory from '../../components/AddCategory';
import Table from '../../components/Table';
import SubPage from '../../components/SubPage';

class Category extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProductsSelect();
  }

  render() {
    const {
      categoryFormData,
      categoryChange,
      addCategory,
      categories,
      columns,
      isCategoryAddOpen,
      toggleAddCategory,
      deleteCategory,
      products,
      selectedProducts,
      handleProductSelect
    } = this.props;

    return (
      <div className='category-dashboard'>
        <SubPage
          title={isCategoryAddOpen ? 'Add Category' : 'Category List'}
          isMenuOpen={isCategoryAddOpen}
          toggleMenu={toggleAddCategory}
        >
          {isCategoryAddOpen ? (
            <AddCategory
              categoryFormData={categoryFormData}
              categoryChange={categoryChange}
              addCategory={addCategory}
              products={products}
              selectedProducts={selectedProducts}
              handleProductSelect={handleProductSelect}
            />
          ) : (
            <Table
              data={categories}
              columns={columns}
              striped={true}
              hover={true}
              condensed={true}
              csv={true}
              search={true}
              isRowEvents={true}
              clickAction={(id, index) => deleteCategory(id, index)}
            />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryFormData: state.category.categoryFormData,
    isCategoryAddOpen: state.category.isCategoryAddOpen,
    categories: state.category.categories,
    columns: state.category.columns,
    products: state.product.productsSelect,
    selectedProducts: state.product.selectedProducts
  };
};

export default connect(mapStateToProps, actions)(Category);
