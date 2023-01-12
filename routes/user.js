const router = require('express').Router();
const { aboutMe, patchUserInfo } = require('../controllers/users');

module.exports = router;

router.get('/users/me', aboutMe);
router.patch('/users/me', patchUserInfo);
