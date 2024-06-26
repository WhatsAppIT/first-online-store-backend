require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const { JWT_SECRET, NODE_ENV } = process.env;
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const SigninError = require('../errors/SigninError');
const RepetError = require('../errors/RepetError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new SigninError('Неправильные логин или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new SigninError('Неправильные логин или пароль');
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          }
        );
        res.send({ token });
      });
    })

    .catch((err) => {
      next(err);
    });
};

const registration = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(
            new ValidationError(
              'Переданы некорректные данные при создании пользователя.'
            )
          );
        }
        if (err.code === 11000) {
          return next(new RepetError('Такаой email уже зарегистрирован'));
        }
        return next(err);
      });
  });
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id U/C');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ValidationError(
            'Переданы некорректные данные при поиске пользователя.'
          )
        );
      }

      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id U/C');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new RepetError('Такаой email уже зарегистрирован c u.'));
      }
      if (err.name === 'ValidationError') {
        return next(
          new ValidationError(
            'Переданы некорректные данные при поиске пользователя.'
          )
        );
      }

      return next(err);
    });
};

module.exports = { login, registration, getProfile, updateProfile };
