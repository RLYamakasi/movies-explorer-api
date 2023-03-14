const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidateCreate } = require('../validations/movie');
const { movieValidateDelete } = require('../validations/movie');

module.exports = router;

router.get('/movies', movieValidateCreate, getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', movieValidateDelete, deleteMovie);
