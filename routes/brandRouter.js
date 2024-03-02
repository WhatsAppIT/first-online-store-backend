const router = require('express').Router();
const { getAllBrand, postBrand } = require('../controllers/brandController');
const { celebrateCreateBrand } = require('../middlewares/celebrate');

router.get('/', getAllBrand);
router.post('/', celebrateCreateBrand, postBrand);

module.exports = router;
