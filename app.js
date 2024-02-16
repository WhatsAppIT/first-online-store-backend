require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const {
    PORT = 3000,
    MONGO_URL = 'mongodb://127.0.0.1:27017/first-online-store-db',
} = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса, "extended: true" означает, что данные в полученном объекте body могут быть любых типов
app.use(cookieParser());
app.use(reqLogger);

app.use('/', allRoutes); //все роуты

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

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
