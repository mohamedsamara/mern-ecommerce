/**
 *
 * ProductsShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/ProductList';

class ProductsShop extends React.PureComponent {
  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchProducts('category', slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchProducts('category', slug);
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div className='products-shop'>
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products
  };
};

export default connect(mapStateToProps, actions)(ProductsShop);
