/**
 *
 * AuthSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import actions from '../../actions';
import setToken from '../../utils/token';
import { JWT_COOKIE } from '../../constants';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class AuthSuccess extends React.PureComponent {
  componentDidMount() {
    const jwtCookie = Cookies.get(JWT_COOKIE);
    if (jwtCookie) {
      Cookies.remove(JWT_COOKIE);
      setToken(jwtCookie);
      localStorage.setItem('token', jwtCookie);
      this.props.setAuth();
    }
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    return <LoadingIndicator />;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(AuthSuccess);
