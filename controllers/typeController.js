const Type = require('../models/typeModel');
const RepetError = require('../errors/RepetError');
const ValidationError = require('../errors/ValidationError');

const getAllType = (req, res, next) => {
  Type.find({})
    .then((type) => res.send(type))
    .catch((err) => next(err));
};

const postType = (req, res, next) => {
  const { name } = req.body;

  Type.create({ name })
    .then((type) => res.status(201).send(type))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      if (err.code === 11000) {
        return next(new RepetError('Такаой тип уже есть'));
      }

      return next(err);
    });
};

module.exports = { getAllType, postType };
