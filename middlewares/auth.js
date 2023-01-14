require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorAuthorization } = require('../constants/errors');

const { NODE_ENV = 'devolepment', JWT_SECRET = 'super-secret' } = process.env;
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  try {
    const tokenCheck = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'supersecretkey');
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin(errorAuthorization));
  }
};
