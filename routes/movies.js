const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

module.exports = router;

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);
