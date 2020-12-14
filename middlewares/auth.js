const jwt = require('jsonwebtoken');

const { secret } = require('../utils/values');

const { NotAutorisationError } = require('../validation/NotAutorisationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAutorisationError());
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    next(new NotAutorisationError());
    return;
  }

  req.user = payload;
  next();
};
