require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); //извлекает данные из заголовка Cookie и затем разобрать полученную строку в объект
const { reqLogger, errorLogger } = require('./middlewares/logger');
const { errors } = require('celebrate'); //мидлвер, который отправит клиенту ошибки(400), которые сгенерировал celebrate
const errorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');

const allRoutes = require('./routes/index');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/first-online-store-db',
} = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса, "extended: true" - данные в полученном объекте body могут быть любых типов
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

app.use(reqLogger); //  подключается до всех обработчиков роутов
app.use('/', allRoutes); //  все роуты
app.use(errorLogger); //  нужно подключить после обработчиков роутов и до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик ошибок

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB подключена');
    await app.listen(PORT, () => {
      console.log(`Приложение запущенно на ${PORT} порту`);
    });
  } catch (err) {
    console.log(`Произошла ошибка при старте приложения ${err}`);
  }
}

start();
