const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const DeleteError = require('../errors/DeleteError');
const Device = require('../models/deviceModel');

const getAllDevices = (req, res, next) => {
  Device.find({})
    .then((devices) => res.send(devices))
    .catch((err) => next(err));
};

const getOneDevice = (req, res, next) => {
  const { id } = req.params.id;

  Device.findById({ id })
    .then((device) => {
      if (!device) {
        throw new NotFoundError('Товар по указанному id не найден.');
      }
      return res.send(device);
    })
    .catch((err) => next(err));
};

const createDevice = (req, res, next) => {
  const { name, price, rating, img, type, brand, deviceInfo, owner } = req.body;

  Device.create({ name, price, rating, img, type, brand, deviceInfo, owner })
    .then((device) => res.status(201).send(device))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Введены не корректные данные');
      }

      return next(err);
    });
};

const deleteDevice = (req, res, next) => {
  const owner = req.user._id;

  Device.findById(req.params.id)

    .then((device) => {
      if (!device) {
        throw new NotFoundError('Товар по указанному id не найден.');
      }
      if (device.owner.toString() !== owner) {
        throw new DeleteError('Нельзя удалить товар.');
      }

      return Device.deleteOne(device);
    })
    .then((myDevice) => {
      res.send(myDevice);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ValidationError('Переданы некорректные данные при поиске товара.')
        );
      }
      return next(err);
    });
};

const upRating = async (req, res, next) => {
  try {
    const putRating = await Device.findByIdAndUpdate(
      req.params.deviceId,
      { $addToSet: { rating: req.user._id } },
      { new: true }
    );

    if (!putRating) {
      throw new NotFoundError('Товар с указанным id не найден.');
    }

    return res.send(putRating);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(
        new ValidationError(
          'Переданы некорректные данные для уменьшения рейтинга.'
        )
      );
    }

    return next(err);
  }
};

const downRating = async (req, res, next) => {
  try {
    const deleteRating = await Device.findByIdAndUpdate(
      req.params.deviceId,
      { $pull: { rating: req.user._id } },
      { new: true }
    );

    if (!deleteRating) {
      throw new NotFoundError('Товар с указанным id не найден.');
    }

    return res.send(deleteRating);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(
        new ValidationError(
          'Переданы некорректные данные для уменьшения рейтинга.'
        )
      );
    }

    return next(err);
  }
};

module.exports = {
  getAllDevices,
  getOneDevice,
  createDevice,
  deleteDevice,
  upRating,
  downRating,
};
