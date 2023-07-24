require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { corsCheck } = require("./middlewares/cors");
const { adress } = require("./constants/mongoAdress");
const { limiter } = require("./modules/rateLimiter");

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(corsCheck);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_ADRESS || adress, () => {
  app.use("/", routes);
  app.use(errorLogger);
  app.use(errors());
  app.use("/", errorHandler);
});

app.listen(3001);
//test
