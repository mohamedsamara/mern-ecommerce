/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Manager/ProductList';
import SubPage from '../../components/Manager/SubPage';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { history, products, user } = this.props;

    return (
      <>
        <SubPage
          title='Products'
          // actionTitle={user.role === 'ROLE_ADMIN' && 'Add'}
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/product/add')}
        >
          <ProductList products={products} />
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
