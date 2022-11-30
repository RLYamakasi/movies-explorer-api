const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesMovie = require('./routes/movies');
const { errorHandler } = require('./middlewares/handler');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsCheck } = require('./middlewares/cors')
const {register, login} = require('./controllers/users')
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/notfound');
const { userValidateLogin, userValidateRegistration } = require('./validations/user');
const app = express();

app.use(corsCheck);
app.use(express.json())
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', (err) => {
    app.use(requestLogger);
    app.post('/signup', userValidateRegistration, register);
    app.post('/signin', userValidateLogin, login);
    app.use('/', auth, routesUser);
    app.use('/', auth, routesMovie);
    app.use(auth, (req, res, next) => {
      next(new NotFound('Маршрут не найден'));
    });
    app.use(errorLogger);
    app.use('/', errorHandler)
});



app.listen(3000);