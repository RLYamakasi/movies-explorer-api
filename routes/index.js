const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { aboutMe, patchUserInfo } = require('../controllers/users');

module.exports = router;

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', deleteMovie);
router.get('/users/me', aboutMe);
router.patch('/users/me', patchUserInfo);
