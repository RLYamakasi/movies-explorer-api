const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const { errorHandler } = require('./middlewares/handler');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsCheck } = require('./middlewares/cors')
const app = express();

app.use(corsCheck);
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', (err) => {
    app.use(requestLogger);
    app.use('/', routesUser);
    app.use(errorLogger);
    app.use('/', errorHandler)
});



app.listen(3000);