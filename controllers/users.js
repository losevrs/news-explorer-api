const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const { ObjectForError } = require('../validation/errors');

const getUser = (req, res, next) => {
  if (!req.user) {
    next(new ObjectForError('NotAutorisation'));
    return;
  }

  const id = req.user._id;

  User.findById(id)
    .orFail(new ObjectForError('ObjectNotFound'))
    .then((user) => res.json({ email: user.email, name: user.name }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.json(user))
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => { // All right
      const secret = NODE_ENV === 'production' ? JWT_SECRET : 'devsecret';
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
      res.json({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
