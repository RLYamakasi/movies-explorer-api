require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET = 'some-defaut-value' } = process.env;
const jwt = require('jsonwebtoken');
const { errorAuthorization } = require('../constants/errors');
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  try {
    const tokenCheck = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'supersecretkey');
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin('errorAuthorization'));
  }
};
