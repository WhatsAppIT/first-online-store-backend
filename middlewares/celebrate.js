const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

const celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const celebrateCreateBrand = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const celebrateCreateType = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

const celebrateCreateDevice = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    img: Joi.string().required().regex(linkRegex),
  }),
});

module.exports = {
  celebrateCreateDevice,
  celebrateCreateType,
  celebrateCreateBrand,
  celebrateLogin,
  celebrateRegistration,
  celebrateUpdateProfile,
};
