require('dotenv').config();

const jwt = require('jsonwebtoken');
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const tokenCheck = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET);
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin('Ошибка авторизации'));
  }
};
