const router = require('express').Router();
const {getMovies, createMovie, deleteMovie} = require('../controllers/movies')

module.exports = router;

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:Id', deleteMovie);