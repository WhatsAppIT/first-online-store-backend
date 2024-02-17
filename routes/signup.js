const router = require('express').Router();
const { celebrateRegistration } = require('../middlewares/celebrate');
const { registration } = require('../controllers/userController');

router.post('/', celebrateRegistration, registration);

module.exports = router;
