/*
 *
 * Brand
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

class Brand extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {} = this.props;

    return <div className='brand' />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(Brand);
