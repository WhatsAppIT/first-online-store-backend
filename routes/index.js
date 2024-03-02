const router = require('express').Router();
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const auth = require('../middlewares/auth');
const { login, registration } = require('../controllers/userController');
const {
  celebrateLogin,
  celebrateRegistration,
} = require('../middlewares/celebrate');
const pageNotFound = require('../middlewares/pageNotFound');

router.post('/signin', celebrateLogin, login);
router.post('/signup', celebrateRegistration, registration);

router.use(auth);

router.use('/users', userRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/devices', deviceRouter);
router.use('*', pageNotFound);

module.exports = router;
