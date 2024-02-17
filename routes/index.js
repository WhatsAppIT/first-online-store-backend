const router = require('express').Router();
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const auth = require('../middlewares/auth');
const { login, registration } = require('../controllers/userController');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signin', login);
router.use('/signup', registration);

router.use(auth);

router.use('/users', userRouter);
//router.use('/type', typeRouter);
//router.use('/brand', brandRouter);
//router.use('/device', deviceRouter);
router.use('*', (req, res, next) =>
  next(new NotFoundError('Страница не найдена'))
);

module.exports = router;
