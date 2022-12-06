const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {getMovies, createMovie, deleteMovie} = require('../controllers/movies')
const { movieValidateCreate } = require('../validations/movie');
module.exports = router;

router.get('/movies', getMovies);
router.post('/movies', movieValidateCreate, createMovie);
router.delete('/movies/:movieId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
}), deleteMovie);
