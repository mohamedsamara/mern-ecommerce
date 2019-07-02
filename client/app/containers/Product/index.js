/*
 *
 * Product
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

class Product extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {} = this.props;

    return <div className='product' />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(Product);
