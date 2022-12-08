const Movies = require('../models/movie');
const BadRequestError = require('../errors/badreq');
const NotFound = require('../errors/notfound');
const ForbidenError = require('../errors/forbiddenerror');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movies.create({ ...req.body, owner: req.user._id })
    .then(() => res.send({
      ...req.body, owner: req.user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Что-то пошло не так'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movies) => {
      if (!movies) {
        return next(new NotFound('фильм не найден'));
      }
      if (!movies.owner.equals(req.user._id)) {
        return next(new ForbidenError('Нельзя удалить чужой фильм'));
      }
      return movies.remove()
        .then(() => res.status(200).send(movies));
    })
    .catch(next);
};
