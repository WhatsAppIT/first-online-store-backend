const { celebrate, Joi } = require('celebrate');

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

module.exports = {
  celebrateLogin,
  celebrateRegistration,
  celebrateUpdateProfile,
};
