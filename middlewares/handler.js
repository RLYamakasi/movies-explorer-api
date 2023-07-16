const { errorServer } = require("../constants/errors");

module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? errorServer : err.message;
  res.status(statusCode).send({ message, err });
  next();
};
