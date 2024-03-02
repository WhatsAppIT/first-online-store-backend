const router = require('express').Router();
const { getAllType, postType } = require('../controllers/typeController');
const { celebrateCreateType } = require('../middlewares/celebrate');

router.get('/', getAllType);
router.post('/', celebrateCreateType, postType);

module.exports = router;
