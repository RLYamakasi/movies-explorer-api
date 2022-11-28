const router = require('express').Router();
const {aboutMe, register,login} = require('../controllers/users')

module.exports = router;

router.get('/users/me', aboutMe);
router.post('/signup', register);
router.post('/signin', login);