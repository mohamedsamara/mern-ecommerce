/*
 *
 * Category
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

class Category extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {} = this.props;

    return <div className='category' />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(Category);
