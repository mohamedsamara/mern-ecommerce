export const GOOGLE_CALLBACK_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL_PROD
    : process.env.GOOGLE_CALLBACK_URL_DEV;

export const FACEBOOK_CALLBACK_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.FACEBOOK_CALLBACK_URL_PROD
    : process.env.FACEBOOK_CALLBACK_URL_DEV;
