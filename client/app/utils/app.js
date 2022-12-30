import { ROLES, EMAIL_PROVIDER } from '../constants';

export const isProviderAllowed = provider =>
  provider === EMAIL_PROVIDER.Google || provider === EMAIL_PROVIDER.Facebook;

export const isDisabledMerchantAccount = user =>
  user.role === ROLES.Merchant &&
  user.merchant &&
  user.merchant.isActive === false;
