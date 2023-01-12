const express = require('express');
const router = require('express').Router();
const routesMovie = require('./movies');
const routesUser = require('./user');
const { register, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFound = require('../errors/notfound');
const { errorRoute } = require('../constants/errors');
const { messageSignOut } = require('../constants/messages');

const app = express();
module.exports = router;

app.use('/', auth, routesMovie);
app.use('/', auth, routesUser);
app.post('/signup', register);
app.post('/signin', login);
app.post('/signout', auth, (req, res) => {
  res
    .clearCookie('token').status(200).send({ message: messageSignOut });
});
app.use(auth, (req, res, next) => {
  next(new NotFound(errorRoute));
});
