/**
 *
 * Application
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Badge,  Card, CardHeader, CardBody,
  CardTitle, CardText, FormGroup, Label, Input } from 'reactstrap';

import actions from '../../actions';

// routes
import Login from '../Login';
import Signup from '../Signup';
import MerchantSignup from '../MerchantSignup';
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
import AuthSuccess from '../AuthSuccess';

import Radio from '../../components/Common/Radio';
import RangeSlider from '../../components/Common/RangeSlider';
import ShopPagination from '../../components/Common/ShopPagination';
import Footer from '../../components/Common/Footer';
import Page404 from '../../components/Common/Page404';


class Application extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.fetchProfile();
    }

    this.props.handleCart();

    document.addEventListener('keydown', this.handleTabbing);
    document.addEventListener('mousedown', this.handleMouseDown);
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
    const products = this.props.products;
    const totalProducts = this.props.advancedFilters.totalProducts;
    const pageNumber = this.props.advancedFilters.pageNumber;

    return (
      <div className='application'>
        <Notification />
        <Navigation />
        <main className='main'>
          {this.props.location.pathname.includes('/shop')?(

            <Container>
            <Row xs="12">
              <Col xs="3"
              xs={{ size: 12, order: 1 }}
              sm={{ size: 6, order: 1 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 3, order: 1 }}
              >
                <div className='wrapper'>
                  <Card style={{background: 'greenyellow'}}>
                    <CardHeader tag="h3">Showing: <Badge color="dark"  style={{ whiteSpace: 'break-spaces' }}>{`${(totalProducts < 8 ?0:(8*pageNumber)-8)} – ${totalProducts < 8?totalProducts:8*pageNumber} products of ${totalProducts} products`}</Badge></CardHeader>
                  </Card>
                  <Card>
                    <CardHeader tag="h3">Sort By:</CardHeader>
                    <CardBody className='radio'>
                      <Radio handleChangeSubmit={(n,v) => {this.props.advancedProductsSearch(n,v)}}/>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader tag="h3">Price Range:</CardHeader>
                      <CardBody>
                        <RangeSlider name={'Range'} handlePriceChangeSubmit={(n,v) => {this.props.advancedProductsSearch(n,v)}}/>
                      </CardBody>
                  </Card>
                  <Card>
                    <CardHeader tag="h3">Customer Rating:</CardHeader>
                      <CardBody>
                        <RangeSlider name={'Slider'} handleRatingChangeSubmit={(n,v) => {this.props.advancedProductsSearch(n,v)}}/>
                      </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="9"
              xs={{ size: 12, order: 2 }}
              sm={{ size: 6, order: 2 }}
              md={{ size: 8, order: 2 }}
              lg={{ size: 9, order: 2 }}
              >
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
                      <Route path='/login' component={Login} />
                      <Route path='/register' component={Signup} />
                      <Route
                        path='/merchant-signup/:token'
                        component={MerchantSignup}
                      />
                      <Route path='/forgot-password' component={ForgotPassword} />
                      <Route
                        path='/reset-password/:token'
                        component={ResetPassword}
                      />
                      <Route path='/auth/success' component={AuthSuccess} />
                      <Route
                        path='/dashboard'
                        component={Authentication(Dashboard)}
                      />
                      <Route path='/404' component={Page404} />
                      <Route path='*' component={Page404} />
                    </Switch>
                  </div>
                  {totalProducts < 8?(''):(<ShopPagination handlePagenationChangeSubmit={(n,v) => {this.props.advancedProductsSearch(n,v)}} products={products} pages={this.props.advancedFilters.pages}/>)}
              </Col>
            </Row>
          </Container>):(
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
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Signup} />
                  <Route
                    path='/merchant-signup/:token'
                    component={MerchantSignup}
                  />
                  <Route path='/forgot-password' component={ForgotPassword} />
                  <Route
                    path='/reset-password/:token'
                    component={ResetPassword}
                  />
                  <Route path='/auth/success' component={AuthSuccess} />
                  <Route
                    path='/dashboard'
                    component={Authentication(Dashboard)}
                  />
                  <Route path='/404' component={Page404} />
                  <Route path='*' component={Page404} />
                </Switch>
              </div>
            </Container>)}
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    products: state.product.storeProducts,
    advancedFilters: state.product.advancedFilters
  };
};

export default connect(mapStateToProps, actions)(withRouter(Application));
