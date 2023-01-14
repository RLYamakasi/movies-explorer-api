const router = require('express').Router();
const routesMovie = require('./movies');
const routesUser = require('./user');
const { register, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFound = require('../errors/notfound');
const { errorRoute } = require('../constants/errors');
const { messageSignOut } = require('../constants/messages');

module.exports = router;

router.use('/', auth, routesMovie);
router.use('/', auth, routesUser);
router.post('/signup', register);
router.post('/signin', login);
router.post('/signout', auth, (req, res) => {
  res
    .clearCookie('token').status(200).send({ message: messageSignOut });
});
router.use(auth, (req, res, next) => {
  next(new NotFound(errorRoute));
});
