const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_MEMBER = 'ROLE_MEMBER';
const ROLE_MERCHANT = 'ROLE_MERCHANT';

exports.ROLES = {
  Admin: ROLE_ADMIN,
  Member: ROLE_MEMBER,
  Merchant: ROLE_MERCHANT
};

exports.MERCHANT_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

exports.CART_ITEM_STATUS = {
  Processing: 'Processing',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Not_processed: 'Not processed'
};

exports.REVIEW_STATUS = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Waiting_Approval: 'Waiting Approval'
};

exports.EMAIL_PROVIDER = {
  Email: 'Email',
  Google: 'Google',
  Facebook: 'Facebook'
};
