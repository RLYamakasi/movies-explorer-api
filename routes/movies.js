const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {getMovies, createMovie, deleteMovie} = require('../controllers/movies')
const { movieValidateCreate } = require('../Validations/movie');
module.exports = router;

router.get('/movies', getMovies);
router.post('/movies', movieValidateCreate, createMovie);
router.delete('/movies/:Id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);