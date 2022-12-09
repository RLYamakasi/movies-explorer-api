const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routesUser = require('./routes/users');
const routesMovie = require('./routes/movies');
const { errorHandler } = require('./middlewares/handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsCheck } = require('./middlewares/cors');
const { register, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/notfound');
const { userValidateLogin, userValidateRegistration } = require('./validations/user');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(limiter);
app.use(corsCheck);
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/moviesdb', () => {
  app.use(requestLogger);
  app.post('/signup', userValidateRegistration, register);
  app.post('/signin', userValidateLogin, login);
  app.post('/signout', (req, res) => {
    res
      .clearCookie('token').status(200).send({ message: 'Вы успешно вышли из системы!' });
  });
  app.use('/', auth, routesUser);
  app.use('/', auth, routesMovie);
  app.use(auth, (req, res, next) => {
    next(new NotFound('Маршрут не найден'));
  });
  app.use(errorLogger);
  app.use('/', errorHandler);
});

app.listen(3001);
