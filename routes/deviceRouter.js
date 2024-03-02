const router = require('express').Router();
const {
  getAllDevices,
  getOneDevice,
  createDevice,
  deleteDevice,
  upRating,
  downRating,
} = require('../controllers/deviceController');
//const { celebrateCreateDevice } = require('../middlewares/celebrate');

router.get('/', getAllDevices);
router.post('/', createDevice); //нужно добавить celebrate
router.get('/:id', getOneDevice);
router.delete('/:id', deleteDevice); //нужно добавить celebrate
router.put('/:deviceId/rating', upRating); //нужно добавить celebrate
router.delete('/:deviceId/rating', downRating); //нужно добавить celebrate

module.exports = router;
