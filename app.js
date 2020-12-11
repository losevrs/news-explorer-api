const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const { srvLog, errorLog } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

require('dotenv').config();

const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');

const { sendError } = require('./validation/errors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/explorernews', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Логирование запросов к серверу
app.use(srvLog);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email,
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use(router);

// Обработка ошибок
app.use(errorLog);
app.use(errors());
app.use((error, req, res, next) => {
  sendError(error, res);
  next();
});

app.listen(PORT, () => {
});
