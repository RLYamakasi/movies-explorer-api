const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { aboutMe, patchUserInfo } = require('../controllers/users');
const { movieValidateCreate, movieValidateDelete } = require('../validations/movie')

module.exports = router;

router.get('/movies', getMovies);
router.post('/movies',movieValidateCreate, createMovie);
router.delete('/movies/:_id', movieValidateDelete, deleteMovie);
router.get('/users/me', aboutMe);
router.patch('/users/me', patchUserInfo);

