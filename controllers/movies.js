const Movies = require('../models/movie');
const BadRequestError = require('../errors/badreq');
const NotFound = require('../errors/notfound');
const ForbidenError = require('../errors/forbiddenerror');
const {
  errorInvalidData, errorValidation, errorNotFoundFilm, errorCantDeleteFilm,
} = require('../constants/errors');

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
      if (err.name === errorValidation) {
        return next(new BadRequestError(errorInvalidData));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movies) => {
      if (!movies) {
        return next(new NotFound(errorNotFoundFilm));
      }
      if (!movies.owner.equals(req.user._id)) {
        return next(new ForbidenError(errorCantDeleteFilm));
      }
      return movies.remove()
        .then(() => res.status(200).send(movies));
    })
    .catch(next);
};


module.exports.setLikeToMovie = (req, res, next) => {
  Movies.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((movies) => {
      if (!movies) {
        return next(new NotFound('фильм не найден'));
      }
      return res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.deleteLikeFromMovie = (req, res, next) => {
  Movies.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((movies) => {
      if (!movies) {
        return next(new NotFound('фильм не найден'));
      }
      return res.status(200).send(movies);
    })
    .catch(next);
};
