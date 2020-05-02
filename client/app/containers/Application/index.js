/**
 *
 * Application
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import cookie from 'react-cookies';

import actions from '../../actions';

// routes
import LoginPage from '../Login';
import SignupPage from '../Signup';
import HomePage from '../Homepage';
import Dashboard from '../Dashboard';
import Navigation from '../Navigation';
import Authentication from '../Authentication';
import Notification from '../Notification';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Shop from '../Shop';
import BrandPage from '../BrandPage';
import ProductPage from '../ProductPage';
import Sell from '../Sell';
import Contact from '../Contact';

import Page404 from '../../components/Page404';
import Footer from '../../components/Footer';

class Application extends React.PureComponent {
  componentDidMount() {
    const user = cookie.load('user');

    if (user != undefined) {
      this.props.fetchProfile(user);
    }

    this.props.handleCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated) {
      this.props.handleCartStatus();
    }
  }

  render() {
    return (
      <div className='application'>
        <Notification />
        <Navigation />
        <main className='main'>
          <Container>
            <div className='wrapper'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={Shop} />
                <Route path='/sell' component={Sell} />
                <Route path='/contact' component={Contact} />
                <Route path='/brands' component={BrandPage} />
                <Route path='/product/:slug' component={ProductPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={SignupPage} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route
                  path='/reset-password/:token'
                  component={ResetPassword}
                />
                <Route
                  path='/dashboard'
                  component={Authentication(Dashboard)}
                />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Application);
