const router = require('express').Router();
const { aboutMe } = require('../controllers/users')

module.exports = router;

router.get('/users/me', aboutMe);
