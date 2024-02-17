const router = require('express').Router();
const { celebrateUpdateProfile } = require('../middlewares/celebrate');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/me', getProfile);
router.patch('/me', celebrateUpdateProfile, updateProfile);

module.exports = router;
