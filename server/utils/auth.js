const jwt = require('jsonwebtoken');

const checkAuth = async req => {
  try {
    if (!req.headers.authorization) {
      return null;
    }

    const token =
      (await jwt.decode(req.headers.authorization.split(' ')[1])) ||
      req.headers.authorization;

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    return null;
  }
};

module.exports = checkAuth;
