const movies = require('../models/movie')

module.exports.getMovies=(req,res,next)=>{
  movies.find({})
    .then((user)=>res.send(user))
    .catch(next)

}

module.exports.createMovie=(req,res,next)=>{
  const{country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId} = req.body
  movies.create({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId})
  .then(() => res.send({
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId
  }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.send(err);
      return next(new BadRequestError('Что-то пошло не так'));
    }
    if (err.code === 11000) {
      return next(new AuthError('Фильм зарегистрирован'));
    }
    return next(err);
  });
}

module.exports.deleteMovie=(req,res,next)=>{
  Cards.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return next(new NotFound('фильм не найден'));
      }
      if (!cards.owner.equals(req.user._id)) {
        return next(new ForbidenError('Нельзя удалить чужой фильм'));
      }
      return cards.remove()
        .then(() => res.status(200).send(cards));
    })
    .catch(next);
}