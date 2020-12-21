const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const { ObjectNotFoundError } = require('../validation/NotFoundError');

const usersRouter = require('./users');
const articlesRouter = require('./articles');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res, next) => {
  next(new ObjectNotFoundError());
});

module.exports = router;
