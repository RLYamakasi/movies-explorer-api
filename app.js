const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsCheck } = require('./middlewares/cors');
const { register, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/notfound');
const { adress } = require('./constants/mongoAdress');

console.log(adress)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(corsCheck);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(adress, () => {
  app.post('/signup', register);
  app.post('/signin', login);
  app.post('/signout', auth, (req, res) => {
    res
      .clearCookie('token').status(200).send({ message: 'Вы успешно вышли из системы!' });
  });
  app.use('/', auth, routes);
  app.use(auth, (req, res, next) => {
    next(new NotFound('Маршрут не найден'));
  });
  app.use(errorLogger);
  app.use('/', errorHandler);
});

app.listen(3000);
