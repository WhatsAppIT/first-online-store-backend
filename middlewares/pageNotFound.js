const NotFoundError = require('../errors/NotFoundError');

function pageNotFound(req, res, next) {
  return next(new NotFoundError('Страница не найдена'));
}

module.exports = pageNotFound;
