/**
 *
 * AuthSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import setToken from '../../utils/token';

import actions from '../../actions';

class AuthSuccess extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');
    setToken(token);
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    return <h1>AuthSuccess</h1>;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    isLoading: state.authentication.isLoading
  };
};

export default connect(mapStateToProps, actions)(AuthSuccess);
