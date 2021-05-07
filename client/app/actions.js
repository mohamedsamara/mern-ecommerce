/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators } from 'redux';

import * as application from './containers/Application/actions';
import * as authentication from './containers/Authentication/actions';
import * as homepage from './containers/Homepage/actions';
import * as signup from './containers/Signup/actions';
import * as login from './containers/Login/actions';
import * as forgotPassword from './containers/ForgotPassword/actions';
import * as navigation from './containers/Navigation/actions';
import * as cart from './containers/Cart/actions';
import * as newsletter from './containers/Newsletter/actions';
import * as dashboard from './containers/Dashboard/actions';
import * as account from './containers/Account/actions';
import * as address from './containers/Address/actions';
import * as resetPassword from './containers/ResetPassword/actions';
import * as users from './containers/Users/actions';
import * as product from './containers/Product/actions';
import * as category from './containers/Category/actions';
import * as brand from './containers/Brand/actions';
import * as menu from './containers/NavigationMenu/actions';
import * as shop from './containers/Shop/actions';
import * as merchant from './containers/Merchant/actions';
import * as contact from './containers/Contact/actions';
import * as order from './containers/Order/actions';
import * as review from './containers/Review/actions';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...application,
      ...authentication,
      ...homepage,
      ...signup,
      ...login,
      ...forgotPassword,
      ...navigation,
      ...cart,
      ...newsletter,
      ...dashboard,
      ...account,
      ...address,
      ...resetPassword,
      ...users,
      ...product,
      ...category,
      ...brand,
      ...menu,
      ...shop,
      ...merchant,
      ...contact,
      ...order,
      ...review
    },
    dispatch
  );
}
