const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const { errors } = require('celebrate');

const { srvLog, errorLog } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorhandler');

const { limiter } = require('./utils/ratelimiter');

const { PORT, db } = require('./utils/values');
const router = require('./routes/index');

const app = express();
app.use(helmet());
app.use(limiter);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Логирование запросов к серверу

app.use(srvLog);
app.use(router); // Роутинг

// Обработка ошибок
app.use(errorLog); // Лог ошибок
app.use(errors()); // Joi
app.use(errorHandler); // Централизованная обработка

app.listen(PORT, () => {
});
