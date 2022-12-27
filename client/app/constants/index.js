export const BASE_API_URL = process.env.BASE_API_URL;

export const SOCKET_URL =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:3000'
    : window.location.host;

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_MEMBER = 'ROLE_MEMBER';
const ROLE_MERCHANT = 'ROLE_MERCHANT';

export const ROLES = {
  Admin: ROLE_ADMIN,
  Member: ROLE_MEMBER,
  Merchant: ROLE_MERCHANT
};

export const CART_ITEMS = 'cart_items';
export const CART_TOTAL = 'cart_total';
export const CART_ID = 'cart_id';
