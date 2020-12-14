const { sendError } = require('../validation/errors');

module.exports.errorHandler = (error, req, res, next) => {
  sendError(error, res);
  next();
};
