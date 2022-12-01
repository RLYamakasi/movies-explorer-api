module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  console.log(err)
  res.status(statusCode).send({ message });
  next();
};