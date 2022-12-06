const Movies = require('../models/movie')

module.exports.getMovies=(req,res,next)=>{
  Movies.find({})
    .then((movie)=>res.send(movie))
    .catch(next)

}

module.exports.createMovie=(req,res,next)=>{
  const{country, director, duration, year, description, image, nameRU, nameEN, thumbnail, movieId, trailerLink} = req.body
  const owner = 'req.user._id';
  Movies.create({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner})
  .then(() => res.send({
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
  }))
  .catch((err) => {
    res.send(err);
    if (err.name === 'ValidationError') {
      res.send(err);
      console.log(err)
      return next(new BadRequestError('Что-то пошло не так'));
    }
    if (err.code === 11000) {
      return next(new AuthError('Фильм зарегистрирован'));
    }
    return next(err);
  });
}

module.exports.deleteMovie=(req,res,next)=>{
  Movies.findById(req.params.cardId)
    .then((movie) => {
      if (!movies) {
        return next(new NotFound('фильм не найден'));
      }
      if (!movies.owner.equals(req.user._id)) {
        return next(new ForbidenError('Нельзя удалить чужой фильм'));
      }
      return Movies.remove()
        .then(() => res.status(200).send(movies));
    })
    .catch(next);
}