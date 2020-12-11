const router = require('express').Router();

const { ObjectForError } = require('../validation/errors');

const usersRouter = require('./users');
const articlesRouter = require('./articles');

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res, next) => {
  next(new ObjectForError('ObjectNotFound'));
});

module.exports = router;
