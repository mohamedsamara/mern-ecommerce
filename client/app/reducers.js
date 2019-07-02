/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notifications } from 'react-notification-system-redux';

// import reducers
import applicationReducer from './containers/Application/reducer';
import homepageReducer from './containers/Homepage/reducer';
import signupReducer from './containers/Signup/reducer';
import loginReducer from './containers/Login/reducer';
import forgotPasswordReducer from './containers/ForgotPassword/reducer';
import navigationReducer from './containers/Navigation/reducer';
import authenticationReducer from './containers/Authentication/reducer';
import cartReducer from './containers/Cart/reducer';
import newsletterReducer from './containers/Newsletter/reducer';
import customerReducer from './containers/Customer/reducer';
import adminReducer from './containers/Admin/reducer';
import accountReducer from './containers/Account/reducer';
import resetPasswordReducer from './containers/ResetPassword/reducer';
import usersReducer from './containers/Users/reducer';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    applicaiton: applicationReducer,
    homepage: homepageReducer,
    signup: signupReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    navigation: navigationReducer,
    authentication: authenticationReducer,
    cart: cartReducer,
    newsletter: newsletterReducer,
    customer: customerReducer,
    admin: adminReducer,
    account: accountReducer,
    resetPassword: resetPasswordReducer,
    users: usersReducer
  });

export default createReducer;
