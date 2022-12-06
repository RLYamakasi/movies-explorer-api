const movies = require('../models/movie')

module.exports.getMovies=(req,res,next)=>{
  movies.find({})
    .then((user)=>res.send(user))
    .catch(next)

}

module.exports.createMovie=(req,res,next)=>{
  const{country, director, duration, year, description, image, nameRU, nameEN, thumbnail, movieId, trailerLink} = req.body
  movies.create({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId})
  .then(() => res.send({
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId
  }))
  .catch((err) => {
    console.log(err)
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