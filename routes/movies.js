const router = require('express').Router();
const { getMovies, createMovie, deleteMovie,setLikeToMovie,deleteLikeFromMovie } = require('../controllers/movies');
const { movieValidateCreate } = require('../validations/movie');
const { movieValidateDelete } = require('../validations/movie');

module.exports = router;

router.get('/movies', movieValidateCreate, getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', movieValidateDelete, deleteMovie);
router.put('/movies/:_id', setLikeToMovie);
router.delete('/movies/:_id', deleteLikeFromMovie);