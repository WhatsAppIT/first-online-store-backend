const Brand = require('../models/brandModel');
const RepetError = require('../errors/RepetError');
const ValidationError = require('../errors/ValidationError');

const getAllBrand = (req, res, next) => {
  Brand.find({})
    .then((brand) => res.send(brand))
    .catch((err) => next(err));
};

const postBrand = (req, res, next) => {
  const { name } = req.body;

  Brand.create({ name })
    .then((brand) => res.status(201).send(brand))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поле не может быть пустым'));
      }
      if (err.code === 11000) {
        return next(new RepetError('Такаой бренд уже есть'));
      }

      return next(err);
    });
};

module.exports = { getAllBrand, postBrand };
