/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

class Homepage extends React.PureComponent {
  componentDidMount() {}

  render() {
    return <div>HomePage</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(Homepage);
