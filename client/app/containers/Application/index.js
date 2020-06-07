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
import BrandsPage from '../BrandsPage';
import ProductPage from '../ProductPage';
import Sell from '../Sell';
import Contact from '../Contact';
import OrderSuccess from '../OrderSuccess';
import OrderPage from '../OrderPage';

import Footer from '../../components/Footer';
import Page404 from '../../components/Page404';

class Application extends React.PureComponent {
  componentDidMount() {
    const user = cookie.load('user');

    if (user !== undefined) {
      this.props.fetchProfile(user);
    }

    this.props.handleCart();

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated) {
      this.props.handleCartStatus();
    }
  }

  handleTabbing(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
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
                <Route path='/brands' component={BrandsPage} />
                <Route path='/product/:slug' component={ProductPage} />
                <Route path='/order/success/:id' component={OrderSuccess} />
                <Route path='/order/:id' component={OrderPage} />
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
                <Route path='/404' component={Page404} />
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
