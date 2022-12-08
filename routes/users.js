const router = require('express').Router();
const { aboutMe, patchUserInfo } = require('../controllers/users');
const { userValidateRegistration } = require('../validations/user');

module.exports = router;

router.get('/users/me', aboutMe);
router.patch('/users/me', userValidateRegistration, patchUserInfo);
