const winston = require('winston'); //библиотека для логирования
const expressWinston = require('express-winston'); //мидлвер
// логгер запросов
const reqLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});
// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = {
  reqLogger,
  errorLogger,
}; //импорт в app
