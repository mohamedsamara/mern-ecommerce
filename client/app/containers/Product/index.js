/*
 *
 * Product
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AddProduct from '../../components/AddProduct';
import Table from '../../components/Table';
import SubPage from '../../components/SubPage';

class Product extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategoriesSelect();
    this.props.fetchProducts();
  }

  render() {
    const {
      productFormData,
      productChange,
      addProduct,
      selectedCategories,
      categories,
      categorySelect,
      products,
      columns,
      toggleAddProduct,
      isProductAddOpen
    } = this.props;

    return (
      <div className='product'>
        <SubPage
          title={isProductAddOpen ? 'Add Product' : 'Product List'}
          isMenuOpen={isProductAddOpen}
          toggleMenu={toggleAddProduct}
        >
          {isProductAddOpen ? (
            <AddProduct
              productFormData={productFormData}
              categories={categories}
              selectedCategories={selectedCategories}
              categorySelect={categorySelect}
              productChange={productChange}
              addProduct={addProduct}
            />
          ) : (
            <Table
              data={products}
              columns={columns}
              striped={true}
              hover={true}
              condensed={true}
              csv={true}
              search={true}
            />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    productFormData: state.product.productFormData,
    selectedCategories: state.category.selectedCategories,
    categories: state.category.categoriesSelect,
    products: state.product.products,
    columns: state.product.columns,
    isProductAddOpen: state.product.isProductAddOpen
  };
};

export default connect(
  mapStateToProps,
  actions
)(Product);
