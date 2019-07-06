/**
 *
 * Brands
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/ProductList';

class Brands extends React.PureComponent {
  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchProducts('brand', slug);
  }

  render() {
    const { products } = this.props;

    return (
      <div className='brands'>
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

export default connect(
  mapStateToProps,
  actions
)(Brands);
