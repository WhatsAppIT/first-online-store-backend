const router = require('express').Router();
const { login } = require('../controllers/userController');
const { celebrateLogin } = require('../middlewares/celebrate');

router.post('/', celebrateLogin, login);

module.exports = router;
