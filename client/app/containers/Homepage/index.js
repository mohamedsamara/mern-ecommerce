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
    return <h3>Homepage</h3>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
