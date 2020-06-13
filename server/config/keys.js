module.exports = {
  app: {
    name: 'Mern Ecommerce'
  },
  port: process.env.PORT || 5000,
  database: {
    url: process.env.MONGO_URI
  },
  api: {
    prefix: '/api'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  },
  mailchimp: {
    key: process.env.MAILCHIMP_KEY,
    listKey: process.env.MAILCHIMP_LIST_KEY
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER
  }
};
